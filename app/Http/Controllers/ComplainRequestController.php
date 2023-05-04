<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerStoreRequest;
use App\Models\ComplainRequest;
use App\Http\Requests\StoreComplainRequestRequest;
use App\Http\Requests\UpdateComplainRequestRequest;
use App\Http\Resources\ComplainRequestCollection;
use App\Models\Complain;
use App\Models\ComplainCaller;
use App\Models\ComplainCase;
use App\Models\Connote;
use App\Models\CsZone;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

class ComplainRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function customer()
    {
        return Inertia::render('Landing/Landing', [
            'callers' => ComplainCaller::all()
        ]);
    }

    public function test()
    {
        return Inertia::render('Landing/Test');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function customerStore(CustomerStoreRequest $request)
    {
        // dd($request->all());
        $cnote_no = preg_replace('/\s+/', '', $request->cnote);


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
            'shipper_phone' => $shippers['phone'],

            'destination' => $receivers['destination'],
            'receiver_name' => $receivers['receiver_name'],
            'receiver_address' => is_array($receivers['address']) ? $receivers['destination'] : $receivers['address'],
            'receiver_city' =>  is_array($receivers['city']) ? $receivers['destination'] : $receivers['city'],
            'receiver_phone' => $receivers['phone'],
        ];



        $contactName = $request->usenumber == true ? ($request->caller_category == 2 ? $detail['receiver_name'] : $detail['shipper_name']) : false;
        $contactPhone = $request->usenumber == true ? ($request->caller_category == 2 ? $detail['receiver_phone'] : $detail['shipper_phone']) : false;
        $data = [
            'no_request' =>  'REQCS' . date('d') . strtoupper(Str::random(4)) . date('ym'),
            'caller_category' => $request->caller_category,
            'caller_sub_category' => $request->caller_sub_category,
            'caller_contact_name' => $contactName ? $contactName : $request->caller_contact_name,
            'caller_contact_person' => $contactPhone ? $contactPhone : $request->caller_contact_person,
            'case_reason' => $request->case_reason,
            'request_status' => 'open',
        ];



        try {
            DB::beginTransaction();
            $generateAwb = Connote::firstOrCreate(['connote' => $cnote_no], $detail);
            $generateAwb->complainRequest()->create($data);
            DB::commit();
            return redirect()->route('customepage')->with('message', 'Complain Anda akan segera kami proses, Kami akan menghubungi nomor yang telah anda cantumkan, Trimakasih');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('customepage')->withErrors('Maaf terjadi kesalahan saat pemprosesan, mohon refresh halaman dan masukkan kembali data anda');
        }
    }

    public function requestComplain()
    {
        // $data = new ComplainRequestCollection(ComplainRequest::paginate(2));
        // dd($data);
        // $filters = request()->data;
        // $data =  ComplainRequest::with('cnote', 'cnote.shipper', 'cnote.receiver', 'callers');
        // return request()->input('data.find', []);
        // return request()->input('data.cn');
        $data = ComplainRequest::query()->with('cnote', 'callers')->withFilters();



        return Inertia::render('Ecare/CustomerRequest/ComplainRequest', [
            'requests' => $data->paginate(20),
            'filters' => request()->data ?? null
        ]);
    }

    public function internal()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreComplainRequestRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComplainRequestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function show(ComplainRequest $complainRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function edit(ComplainRequest $complainRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateComplainRequestRequest  $request
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateComplainRequestRequest $request, ComplainRequest $complainRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ComplainRequest  $complainRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComplainRequest $complainRequest)
    {
        //
    }
}
