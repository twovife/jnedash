<?php

namespace App\Http\Controllers;

use App\Models\Complain;
use App\Models\ComplainCaller;
use App\Models\ComplainRequest;
use App\Models\Connote;
use App\Models\SalesOffice;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CustomerServiceController extends Controller
{
    function index()
    {
        return Inertia::render('CustomerService/CustomerService');
    }

    function internalIndex()
    {
        return Inertia::render('CustomerService/InternalService', [
            'complain_callers' => ComplainCaller::whereIn('id', [4, 5])->get(),
            'sales_offices' => SalesOffice::all(),
        ]);
    }

    function internalStore(Request $request)
    {
        $request->validate([
            'caller_category' => ['required', 'integer'],
            'caller_sub_category' => ['required', 'string'],
            'caller_contact_name' => ['required', 'string'],
            'caller_contact_person' => ['required', 'string'],
            'case_reason' => ['required', 'string'],
        ], [
            '*.required' => 'Wajib di isi',
            '*.string' => 'Input hanya berupa string'
        ]);



        $request['no_request'] = 'REQCS' . date('d') . strtoupper(Str::random(4)) . date('ym');
        $request['request_status'] = 'open';

        try {
            DB::beginTransaction();
            if ($request->resi) {
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
                    'shipper_phone' => is_array($shippers['phone']) ? 0 : $shippers['phone'],

                    'destination' => $receivers['destination'],
                    'receiver_name' => $receivers['receiver_name'],
                    'receiver_address' => is_array($receivers['address']) ? $receivers['destination'] : $receivers['address'],
                    'receiver_city' =>  is_array($receivers['city']) ? $receivers['destination'] : $receivers['city'],
                    'receiver_phone' => $receivers['phone'],
                ];
                // dd($detail);
                $fetchConnote = Connote::firstOrCreate(['connote' => $cnote_no], $detail);
                // dd($fetchConnote);
                $request['connote_id'] = $fetchConnote->id;
            }

            // dd($request->all());
            $fetchComplainRequest = ComplainRequest::create($request->all());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            ddd($e);
            return redirect()->route('customepage')->withErrors('Maaf terjadi kesalahan saat pemprosesan, mohon refresh halaman dan masukkan kembali data anda');
        }

        return redirect()->route('cs.detailRequest', $fetchComplainRequest->no_request)->with('message', 'Complain Anda akan segera kami proses, Kami akan menghubungi nomor yang telah anda cantumkan, Trimakasih');
    }

    function detailRequest($no_request)
    {
        $complainRequest = ComplainRequest::where('no_request', $no_request)->firstOrFail();
        return Inertia::render('CustomerService/DetailRequest', [
            'data' => $complainRequest->load('cnote')
        ]);
        // dd($complainRequest);
    }
}
