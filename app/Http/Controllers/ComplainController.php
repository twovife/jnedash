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
use Illuminate\Support\Facades\Session;
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

        Session::put('last_request', request()->all());

        $queries = Complain::with('cnote', 'source', 'callers', 'ticketcase')
            ->withFilters()
            ->when(request()->input('sort', []), function ($que) {
                $que->orderBy(request()->sort[0], request()->sort[1]);
            })
            ->paginate(20)->withQueryString();

        $data['data'] = collect($queries->items())->map(fn ($que) => [
            'id' => $que->id ?? null,
            'no_ticket' => $que->no_ticket ?? null,
            'branch' => $que->branch ?? null,
            'source' => $que->source->source . "-" . $que->source->sub_source ?? null,
            'user_create' => $que->usercreate->username ?? null,
            'created_at' => $que->created_at->format('d-m-Y') ?? null,
            'caller_category' => $que->callers->caller ?? null,
            'caller_sub_category' => $que->caller_sub_category ?? null,
            'caller_contact_name' => $que->caller_contact_name ?? null,
            'caller_contact_person' => $que->caller_contact_person ?? null,
            'connote' => $que->cnote ? $que->cnote->connote : null,
            'connote_date' => $que->cnote ? Carbon::parse($que->cnote->connote_date)->format('d-m-Y') : null,
            'shipper_name' => $que->cnote ? $que->cnote->shipper_name : null,
            'shipper_phone' => $que->cnote ? $que->cnote->shipper_phone : null,
            'receiver_name' => $que->cnote ? $que->cnote->receiver_name : null,
            'receiver_address' => $que->cnote ? $que->cnote->receiver_address : null,
            'receiver_phone' => $que->cnote ? $que->cnote->receiver_phone : null,
            'services_code' => $que->cnote ? $que->cnote->services_code : null,
            'category' => $que->ticketcase->category ?? null,
            'case' => $que->ticketcase->case ?? null,
            'sub_case' => $que->ticketcase->sub_case ?? null,
            'case_priority' => $que->case_priority ?? null,
            'origin' => $que->cnote->origin ?? null,
            'destination' => $que->cnote->destination ?? null,
            'status' => $que->status ?? null,
            'note' => $que->note ?? null,
            'followup_by' => $que->followup_by ?? null,
            'sla_status' => $que->sla_status ?? null,
            'due_date' => $que->due_date ?? null,
        ]);

        $data['link'] = [
            'first_page' => $queries->url(1),
            'last' => $queries->url($queries->lastPage()),
            'previous_page' => $queries->previousPageUrl(),
            'next_page' => $queries->nextPageUrl(),
            'total_data' => $queries->total()
        ];


        return Inertia::render('Csoffice/Ecare/Index', [
            'complains' => $data,
            'filters' => request()->all()
        ]);
    }


    public function create(Request $request)
    {

        return Inertia::render('Csoffice/Ecare/Create', [
            'sources' => ComplainSource::all(),
            'complaincase' => ComplainCase::all(),
            'callers' => ComplainCaller::all(),
            'sendingoffices' => SalesOffice::all(),
            'followups' => ComplainFollowUp::query()->select('name')->get(),
        ]);
    }



    public function store(ComplainStoreRequest $request)
    {


        $lastRequest = Session::get('last_request', []);
        Session::forget('last_request');

        $duedate = Carbon::createFromFormat('d/m/Y', $request->due_date)->format('Y-m-d');
        $data = [
            'no_ticket' =>  'TCS' . date('d') . strtoupper(Str::random(4)) . date('ym'),
            "branch" => $request->branch,
            "complainsource_id" => $request->complainsource_id,
            "caller_category" => $request->caller_category,
            "caller_sub_category" => $request->caller_sub_category,
            "caller_contact_name" => $request->caller_contact_name,
            "caller_contact_person" => $request->caller_contact_person,
            "resi" => $request->resi,
            "complain_case_id" => $request->complain_case_id,
            "zona" => $request->zona,
            "sla" => $request->sla,
            "due_date" => $duedate,
            "case_priority" => $request->case_priority,
            "followup_by" => $request->followup_by,
            "note" => $request->note,
            'sla_status' => null,
            'status' => 'open',
            'user_create' => Auth::user()->id,
        ];

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
                    'receiver_phone' => is_array($receivers['phone']) ? 0 : $receivers['phone'],
                ];
                $fetchConnote = Connote::firstOrCreate(['connote' => $cnote_no], $detail);
                $data['connote_id'] = $fetchConnote->id;
            }

            $fetchComplainRequest = Complain::create($data);
            DB::commit();
        } catch (Exception $e) {
            dd($e);
            return redirect()->back()->withErrors('Maaf terjadi kesalahan saat pemprosesan, mohon refresh halaman dan masukkan kembali data anda');
        }

        return redirect()->route('csoffice.complain.index', $lastRequest)->with('message', 'Data berhasil ditambahkan');
    }



    public function storecomment(Request $request, Complain $complain)
    {
        $validate = $request->validate([
            'complain_id' => ['required', 'integer'],
            'comment' => ['required', 'string']
        ]);

        $validate['user_comment'] = Auth::user()->id;

        try {
            DB::beginTransaction();
            $complain->status = $request->status ?? 'process';
            $complain->save();
            $complain->comments->create($validate);
            DB::commit();
        } catch (Exception $th) {
            return redirect()->back()->with('message', 'Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 2');
        }

        return back();
    }

    public function show(Complain $complain)
    {
        //
    }



    public function edit(Complain $complain)
    {

        return Inertia::render('Csoffice/Ecare/EditComplain', [
            'complain' => $complain->load('cnote'),
            'sources' => ComplainSource::all(),
            'complaincase' => ComplainCase::all(),
            'callers' => ComplainCaller::all(),
            'sendingoffices' => SalesOffice::all(),
            'followups' => ComplainFollowUp::query()->select('name')->get(),
        ]);
    }

    public function update(Request $request, Complain $complain)
    {



        $lastRequest = Session::get('last_request', []);
        Session::forget('last_request');

        try {
            DB::beginTransaction();
            $duedate = Carbon::createFromFormat('d/m/Y', $request->due_date)->format('Y-m-d');
            $data = [
                "branch" => $request->branch,
                "complainsource_id" => $request->complainsource_id,
                "caller_category" => $request->caller_category,
                "caller_sub_category" => $request->caller_sub_category,
                "caller_contact_name" => $request->caller_contact_name,
                "caller_contact_person" => $request->caller_contact_person,
                "resi" => $request->resi,
                "complain_case_id" => $request->complain_case_id,
                "zona" => $request->zona,
                "sla" => $request->sla,
                "due_date" => $duedate,
                "case_priority" => $request->case_priority,
                "followup_by" => $request->followup_by,
                "note" => $request->note,
                'sla_status' => null,
                'status' => 'open',
                'user_create' => Auth::user()->id,
            ];
            $complain->update($data);
            DB::commit();
        } catch (Exception $e) {
            dd($e);
            return redirect()->back()->withErrors('Maaf terjadi kesalahan saat pemprosesan, mohon refresh halaman dan masukkan kembali data anda');
        }
        return redirect()->route('csoffice.complain.index', $lastRequest)->with('message', 'Data berhasil ditambahkan');
    }


    public function destroy(Complain $complain)
    {

        $lastRequest = Session::get('last_request', []);
        Session::forget('last_request');

        try {
            ComplainComment::where('complain_id', $complain->id)->delete();
            $complain->delete();
        } catch (Exception $e) {
            dd($e);
            return redirect()->back()->withErrors('Maaf terjadi kesalahan saat pemprosesan, mohon refresh halaman dan masukkan kembali data anda');
        }
        return redirect()->route('csoffice.complain.index', $lastRequest)->with('message', 'Data berhasil ditambahkan');
    }
}
