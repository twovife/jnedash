<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Claim;
use Illuminate\Http\Request;

class ApiEclaimController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = Claim::with('cnote:id,connote', 'cnote.shipper:connote_id,origin', 'cnote.receiver:connote_id,destination');
        if (request('status')) {
            $query->whereStatus(request('status'));
        }
        if (request('closed_at')) {
            $query->whereNotNull('closed_at');
        }
        return response($query->select('id', 'connote_id', 'ticket_id', 'complainant_idcard', 'complainant_bank', 'complainant_nota', 'transfer_nota', 'created_at')->get(), 200);
    }

    public function openclaim()
    {
        $offset =  request('offset') ?? null;
        $limit =  request('limit') ?? 500;
        $query = Claim::with('cnote:id,connote', 'cnote.shipper:connote_id,origin', 'cnote.receiver:connote_id,destination')->whereStatus('open');
        $query->select('id', 'connote_id', 'ticket_id', 'complainant_idcard', 'complainant_bank', 'complainant_nota', 'transfer_nota', 'created_at');

        if ($offset && $limit) {
            $data = $query->offset($offset)->limit($limit)->orderBy('created_at', 'desc')->get();
        } else {
            $data = $query->limit($limit)->latest()->orderBy('created_at', 'desc')->get();
        }
        return response($data, 200);
    }


    public function processed()
    {
        $offset =  request('offset') ?? null;
        $limit =  request('limit') ?? 500;
        $query = Claim::with('cnote:id,connote', 'cnote.shipper:connote_id,origin', 'cnote.receiver:connote_id,destination', 'processedby:id,username')->whereStatus('processed');

        $query->select('id', 'connote_id', 'ticket_id', 'complainant_idcard', 'complainant_bank', 'complainant_nota', 'transfer_nota', 'created_at', 'processed_at', 'processed_by', 'claim_propose');

        if ($offset && $limit) {
            $data = $query->offset($offset)->limit($limit)->orderBy('created_at', 'desc')->get();
        } else {
            $data = $query->limit($limit)->orderBy('created_at', 'desc')->get();
        }
        return response($data, 200);
    }

    public function checkEclaimAwb()
    {
        $awb = request()->nomor_resi;
        //350480012835022
        $cnote_no = preg_replace('/\s+/', '', $awb);

        $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
        $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
        $shipper =  $shipper_array['Entry'] ?? null;

        $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
        $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
        $receiver =  $receiver_array['Entry'] ?? null;

        $detail_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
        $detail_array = json_decode(json_encode((array)simplexml_load_string($detail_xml)), 1);
        $detail =  $detail_array['Entry'] ?? null;


        if (!$shipper) {
            return response()->json(['message' => 'Nomor Resi Tidak ditemukan'], 404);
        }
        if (!str_contains($shipper['origin'], 'KDR')) {
            return response()->json(['message' => 'Nomor Resi Diluar Area, silahkan Hubungi CS Kami'], 400);
        }

        $data = Claim::whereHas('cnote', function ($query) use ($awb) {
            $query->where('connote', $awb);
        })->first();

        // return $data;

        if ($data) {
            return response()->json(['message' => 'Nomor Resi Sudah Di input'], 409);
        }
        return response()->json(['data' => [
            'receiver_name' => $receiver['receiver_name'],
            'receiver_phone' => '********' . substr($receiver['phone'], -4),
            'receiver_dest' => $receiver['city'],
            'asuransi' => $detail['insurance_value'] > 0 ? 'yes' : 'no',
            'date_input' => $detail['connote_date'],
            'isi_kiriman' => $detail['goods_description'],
            'service' => $detail['services_code'],
            'connote' => $detail['connote'],
        ]], 200);
    }
}
