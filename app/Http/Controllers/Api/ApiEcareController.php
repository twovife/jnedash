<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Complain;
use App\Models\ComplainComment;
use App\Models\CsZone;

class ApiEcareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function tracking()
    {
        $awb = request()->cnote;
        $cnote_no = preg_replace('/\s+/', '', $awb);

        $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
        $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
        $detail_cnote['shipper'] =  $shipper_array['Entry'] ?? null;

        $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
        $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
        $detail_cnote['receiver'] =  $receiver_array['Entry'] ?? null;

        $detail_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
        $detail_array = json_decode(json_encode((array)simplexml_load_string($detail_xml)), 1);
        $detail_cnote['detail'] =  $detail_array['Entry'] ?? null;

        $detail_cnote['detail']['claimable'] = str_contains($detail_cnote['shipper']['origin'], 'KDR') ? true : false;
        $detail_cnote['detail']['complainable'] = true;

        return $detail_cnote;


        if (!str_contains($detail_cnote['receiver']['destination'], 'KDR') && !str_contains($detail_cnote['shipper']['origin'], 'KDR')) {
            return response()->json(['message' => 'Nomor Resi Diluar Area Kediri'], 404);
        }


        $zona =  CsZone::query()->where('city_code', $detail_cnote['receiver']['destination'])->first();
        $detail_cnote['receiver']['zona'] = $zona->city_zone;

        $data = Complain::whereHas('cnote', function ($query) use ($awb) {
            $query->where('connote', $awb);
        })->first();

        if ($data) {
            return response()->json(['message' => 'Nomor Resi Sudah Di input'], 409);
        }

        return response()->json($detail_cnote, 200);
    }

    public function getComments(Request $request)
    {
        $data = ComplainComment::where('complain_id', $request->id)->get();
        return response()->json($data, 200);
    }

    public function publicTracking()
    {
        $awb = request()->cnote;
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
    }
}
