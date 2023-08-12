<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complain;
use App\Models\ComplainRequest;
use App\Models\CsZone;
use Illuminate\Database\Eloquent\Builder;

class ApiHandlerController extends Controller
{
    public function trackingResi()
    {

        $cnote_no = preg_replace('/\s+/', '', request()->cnote);
        if (!$cnote_no) {
            return response()->json(['Nomor Resi Tidak Boleh Kosong'], 403);
        }

        $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
        $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
        $shippers =  $shipper_array['Entry'] ?? null;
        if (!$shippers) {
            return response()->json(['Nomor Resi Tidak Ditemukan'], 404);
        }
        $shipper = [
            'origin' => $shippers['origin'],
            'shipper_name' => $shippers['shipper_name'],
            'city' => !str_contains($shippers['origin'], '10000') ? 'KEDIRI' : (!str_contains($shippers['origin'], '10100') ? 'TULUNG AGUNG' : 'TRENGGALEK'),
            'phone' => $shippers['phone'] ?? null,
        ];

        $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
        $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
        $receivers =  $receiver_array['Entry'] ?? null;
        $receiver = [
            'destination' => $receivers['destination'],
            'receiver_name' => $receivers['receiver_name'],
            'address' => $receivers['address'],
            'city' =>  is_array($receivers['city']) ? $receivers['destination'] : $receivers['city'],
            'phone' => $shippers['phone'] ?? null,
        ];


        $detail_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
        $detail_array = json_decode(json_encode((array)simplexml_load_string($detail_xml)), 1);
        $detail =  $detail_array['Entry'] ?? null;

        $complainRequest = ComplainRequest::whereHas('cnote', function (Builder $query) use ($cnote_no) {
            $query->where('connote', $cnote_no)->where('request_status', 'open');
        })->first();

        if ($complainRequest) {
            return response()->json(['Complain Dengan Resi Ini Sedang Diproses'], 400);
        }

        $complain = Complain::whereHas('cnote', function (Builder $query) use ($cnote_no) {
            $query->where('connote', $cnote_no)->where('status', '!=', 'close');
        })->first();
        if ($complain) {
            return response()->json(['Complain Dengan Resi Ini Sedang Diproses'], 400);
        }


        $zona =  CsZone::query()->where('city_code', $receiver['destination'])->first();
        $detail['zona'] = $zona->city_zone;

        $claimable = str_contains($shipper['origin'], 'KDR') ? true : false;
        $complainable = $complain ? false : true;




        if (!$shipper) {
            return response()->noContent();
        }
        return response()->json([
            'shipper' => $shipper,
            'receiver' => $receiver,
            'detail' => $detail,
            'claimable' => $claimable,
            'complainable' => $complainable,
            'complain' => $complain,
        ], 200);
    }
}
