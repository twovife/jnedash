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
use App\Models\ComplainFollowUp;
use App\Models\ComplainSource;
use App\Models\Connote;
use App\Models\CsZone;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ComplainRequestController extends Controller
{



    public function index()
    {

        Session::put('last_request', request()->all());


        $complainrequest = ComplainRequest::with('callers')
            ->withFilters()
            ->limit(5000)
            ->orderBy('created_at', 'desc')
            ->get();


        $data = collect($complainrequest)->map(fn ($que) => [
            'id' => $que->id,
            'created_at' => $que->created_at->format('d-m-Y'),
            'no_request' => $que->no_request,
            'awb' => $que->cnote?->connote,
            'caller_category' => $que->callers->caller,
            'caller_contact_name' => $que->caller_contact_name,
            'caller_contact_person' => $que->caller_contact_person,
            'request_status' => $que->request_status,
        ]);


        return Inertia::render('Csoffice/RequestComplain/Index', [
            'responses' => $data,
            'serverFilters' => request()->all()
        ]);
    }

    public function generate(ComplainRequest $complainRequest)
    {
        $complainReq = $complainRequest->load('callers', 'cnote');
        $destination_zona =  CsZone::query()->where('city_code', $complainReq->cnote?->destination)->first();

        $zona = $destination_zona->city_zone ?? "A";
        return Inertia::render('Csoffice/RequestComplain/RequestAction', [
            'complaincase' => ComplainCase::where('zona', $zona)->get(),
            'sources' => ComplainSource::all(),
            'request' => $complainReq,
            'followups' => ComplainFollowUp::query()->select('name')->get(),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreComplainRequestRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function generatestore(Request $request, ComplainRequest $complainRequest)
    {

        $lastRequest = Session::get('last_request', []);
        Session::forget('last_request');

        if (request()->action == 'rejected') {
            $complainRequest->request_status = 'rejected';
            $complainRequest->save();
            return redirect()->route('csoffice.complainrequest.index', $lastRequest)->with('message', 'Data Berhasil Ditambah');
        }

        $request->validate([
            "branch" => ['required', 'string'],
            "complainsource_id" => ['required', 'integer'],
            "complain_case_id" => ['required', 'integer'],
            "sla" => ['required', 'integer'],
            "zona" => ['required'],
            "case_priority" => ['required'],
            "note" => ['required'],
            "followup_by" => ['required'],
        ]);

        try {
            DB::beginTransaction();
            $complainRequest->request_status = 'closed';
            $complainRequest->save();


            Complain::create([
                'no_ticket' =>  'TCS' . date('d') . strtoupper(Str::random(4)) . date('ym'),
                'branch' => $request->branch,
                'complainsource_id' => $request->complainsource_id,
                'connote_id' => $complainRequest->connote_id,
                'complain_case_id' => $request->complain_case_id,
                'zona' => $request->zona,
                'case_priority' => $request->case_priority,
                'sla' => $request->sla,
                'due_date' => Carbon::now()->addDay($request->sla),
                'sla_status' => null,
                'claim_propose' => $request->claim_propose,
                'note' => $request->note,
                'status' => 'open',
                'user_create' => Auth::user()->id,
                'followup_by' => $request->followup_by,

                'caller_category' => $complainRequest->caller_category,
                'caller_sub_category' => $complainRequest->caller_sub_category,
                'caller_contact_name' => $complainRequest->caller_contact_name,
                'caller_contact_person' => $complainRequest->caller_contact_person,
            ]);
            DB::commit();
        } catch (Exception $e) {
            dd($e);
            return redirect()->back()->withErrors('Maaf terjadi kesalahan saat pemprosesan, mohon refresh halaman dan masukkan kembali data anda');
        }


        return redirect()->route('csoffice.complainrequest.index', $lastRequest)->with('message', 'Data Berhasil Ditambah');
    }

    public function store(StoreComplainRequestRequest $request)
    {
        //
    }


    public function show(ComplainRequest $complainRequest)
    {
        //
    }


    public function edit(ComplainRequest $complainRequest)
    {
        //
    }


    public function update(UpdateComplainRequestRequest $request, ComplainRequest $complainRequest)
    {
        //
    }


    public function destroy(ComplainRequest $complainRequest)
    {
        //
    }
}
