<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Complain;
use App\Models\ComplainComment;
use App\Models\CsZone;
use Carbon\Carbon;

class ApiTraceConnote extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function cek_on_hybrid_api(Request $request)
    {
        // dd($request->resi);
        $cnote_no = preg_replace('/\s+/', '', $request->resi);
        $cnote_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
        $detail_cnote = json_decode(json_encode((array)simplexml_load_string($cnote_xml)), 1);
        // dd($detail_cnote);
        $responseData = [
            'message' => 'Data ditemukan',
            'data' => 200
        ];

        if ($detail_cnote) {
            return response()->json($responseData, 200);
        }
        return response()->json(['message' => 'data tidak ditemukan'], 404);
    }

    public function cen_detail_on_hybrid_api(Request $request)
    {
        $cnote_no = preg_replace('/\s+/', '', $request->resi);


        $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
        $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
        $shippers =  $shipper_array['Entry'] ?? null;

        $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
        $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
        $receivers =  $receiver_array['Entry'] ?? null;

        $detail_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
        $detail_array = json_decode(json_encode((array)simplexml_load_string($detail_xml)), 1);
        $details =  $detail_array['Entry'] ?? null;
        $zona =  CsZone::query()->where('city_code', $receivers['destination'])->first();

        $detail = [
            'receiving_no' => $details['receiving_no'],
            'connote' => $details['connote'],
            'connote_date' =>  Carbon::createFromFormat('d-M-Y H:i:s', $details['connote_date'])->format('Y-m-d\TH:i:s'),
            'customer' => $details['customer'],
            'customer_name' => $details['customer_name'],
            'goods_type' => $details['goods_type'],
            'goods_description' => is_array($details['goods_description']) ? $details['goods_type'] : $details['goods_description'],
            'services_code' => $details['services_code'],
            'payment_type' => $details['payment_type'],
            'qty' => is_array($details['qty']) ? 0 : $details['qty'],
            'weight' => is_array($details['weight']) ? 0 : $details['weight'],
            'amount' => is_array($details['amount']) ? 0 : $details['amount'],
            'insurance_value' => is_array($details['insurance_value']) ? 0 : $details['insurance_value'],

            'origin' => $shippers['origin'],
            'shipper_name' => $shippers['shipper_name'],
            'shipper_city' => $shippers['origin'],
            'shipper_phone' => $shippers['phone'],

            'destination' => $receivers['destination'],
            'receiver_name' => $receivers['receiver_name'],
            'receiver_address' => is_array($receivers['address']) ? $receivers['destination'] : $receivers['address'],
            'receiver_city' =>  is_array($receivers['city']) ? $receivers['destination'] : $receivers['city'],
            'receiver_phone' => $receivers['phone'],
            'zona' => $zona->city_zone
        ];


        if ($details) {
            return response()->json($detail, 200);
        }
        return response()->json(['message' => 'data tidak ditemukan'], 404);
    }
}
