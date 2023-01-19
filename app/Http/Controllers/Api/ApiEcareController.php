<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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


        if (!$detail_cnote['shipper']) {
            return response()->json(['message' => 'Nomor Resi Tidak ditemukan'], 404);
        }
        $origin_zone =  CsZone::query()->where('city_code', $detail_cnote['shipper']['origin'])->first();
        $detail_cnote['shipper']['origin_zone'] = $origin_zone->city_zone;

        return response()->json($detail_cnote, 200);
    }
}
