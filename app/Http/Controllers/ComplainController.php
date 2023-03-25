<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplainStoreRequest;
use App\Models\Complain;
use App\Models\ComplainCaller;
use App\Models\ComplainCase;
use App\Models\ComplainComment;
use App\Models\ComplainFollowUp;
use App\Models\ComplainSource;
use App\Models\Connote;
use App\Models\CsZone;
use App\Models\SalesOffice;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ComplainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Complain::with('source', 'ticketcase', 'complainment.callers', 'comment', 'cnote', 'cnote.shipper', 'cnote.receiver', 'usercreate:id,username', 'userclosed:id,username')->get();
        return Inertia::render('Ecare/Home/Ecare', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function autentikasiresi()
    {
        //
    }
    public function create(Request $request)
    {
        if ($request->cnote) {
            $awb = $request->cnote;
            $cnote_no = preg_replace('/\s+/', '', $awb);

            $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
            $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
            $receiver =  $receiver_array['Entry'] ?? null;

            $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
            $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
            $shipper =  $shipper_array['Entry'] ?? null;


            $resi_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
            $resi_array = json_decode(json_encode((array)simplexml_load_string($resi_xml)), 1);
            $resi =  $resi_array['Entry'] ?? null;

            if (!$receiver) {
                return redirect()->route('ecare.trace.index')->with('_error', 'Nomor Awb yang anda masukkan salah');
            }
            $destination_zona =  CsZone::query()->where('city_code', $receiver['destination'])->first();
        }

        $zona = $destination_zona->city_zone ?? "A";

        return Inertia::render('Ecare/Create/Create', [
            'complaincase' => ComplainCase::where('zona', $zona)->get(),
            'sources' => ComplainSource::all(),
            'callers' => ComplainCaller::all(),
            'receiver' => $receiver ?? null,
            'shipper' => $shipper ?? null,
            'resi' => $resi ?? null,
            'fuby' => ComplainFollowUp::query()->select('name')->get(),
            'sendoffice' => SalesOffice::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ComplainStoreRequest $request)
    {

        $connote_id = null;
        if ($request->resi) {
            $cnote_no = preg_replace('/\s+/', '', $request->resi);
            $isAvailableConnote = Connote::where('connote', $request->resi)->first();
            if ($isAvailableConnote) {
                $connote_id = $isAvailableConnote->id;
            } else {

                $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
                $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
                $shipper =  $shipper_array['Entry'] ?? null;

                $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
                $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
                $receiver =  $receiver_array['Entry'] ?? null;
                $receiver['zone'] =  CsZone::query()->where('city_code', $receiver['destination'])->first();

                $detail_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
                $detail_array = json_decode(json_encode((array)simplexml_load_string($detail_xml)), 1);
                $detail =  $detail_array['Entry'] ?? null;
                $detail['connote_date'] = Carbon::createFromFormat('d-M-Y H:i:s', $detail['connote_date'])->format('Y-m-d\TH:i:s');

                try {
                    DB::beginTransaction();
                    $generateAwb = Connote::create($detail);
                    $generateAwb->receiver()->create($receiver);
                    $generateAwb->shipper()->create($shipper);
                    $connote_id = $generateAwb->id;
                    DB::commit();
                } catch (Exception $e) {
                    DB::rollBack();
                    return redirect()->route('ecare.trace.index')->with('message', 'Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 2');
                }
            }
        }

        $case = ComplainCase::find($request->complain_case_id);
        $data = [
            'no_ticket' =>  'TCS' . date('d') . strtoupper(Str::random(4)) . date('ym'),
            'branch' => $request->branch,
            'complainsource_id' => $request->complainsource_id,
            'connote_id' => $connote_id,
            'complain_case_id' => $case->id,
            'zona' => $case->zona,
            'case_priority' => $request->case_priority,
            'sla' => $case->sla,
            'due_date' => Carbon::now()->addDay($case->sla),
            'sla_status' => null,
            'claim_propose' => $request->claim_propose,
            'note' => $request->note,
            'status' => 'open',
            'user_create' => Auth::user()->id,
        ];
        $complaiment = [
            'comp_status' => $request->comp_status,
            'comp_identiti' => $request->comp_identiti,
            'comp_name' => $request->comp_name,
            'comp_phone' => $request->comp_phone,
        ];

        try {
            DB::beginTransaction();
            $complain = Complain::create($data);
            $complain->complainment()->create($complaiment);
            DB::commit();
            return redirect()->route('ecare.index')->with('message', 'berhasil');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('ecare.trace.index')->with('message', 'Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 2');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Complain  $complain
     * @return \Illuminate\Http\Response
     */

    public function show(Complain $complain)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Complain  $complain
     * @return \Illuminate\Http\Response
     */
    public function edit(Complain $complain)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Complain  $complain
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Complain $complain)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Complain  $complain
     * @return \Illuminate\Http\Response
     */
    public function destroy(Complain $complain)
    {
        //
    }

    public function commentstore(Request $request)
    {
        // dd($request->all());
        $validate = $request->validate([
            'complain_id' => ['required', 'integer'],
            'comment' => ['required', 'string']
        ]);

        $validate['user_comment'] = Auth::user()->id;

        try {
            DB::beginTransaction();
            $complain = Complain::where('id', $request->complain_id)->first();
            $complain->status = $request->status ?? 'process';
            $complain->save();
            ComplainComment::create($validate);
            DB::commit();
        } catch (Exception $th) {
            return redirect()->back()->with('message', 'Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 2');
        }

        return back();
    }
}
