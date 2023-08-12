<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Complain;
use App\Models\ComplainComment;
use App\Models\CsZone;

class ApiCustomerCare extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    function cek_on_hybrid_api(Request $request)
    {
        $cnote_no = preg_replace('/\s+/', '', $request->cnote);
        $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
        $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
    }
}
