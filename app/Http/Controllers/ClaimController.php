<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Http\Requests\StoreClaimRequest;
use App\Http\Requests\UpdateClaimRequest;
use App\Mail\CreateClaimMail;
use App\Models\Connote;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Intervention\Image\Facades\Image;

class ClaimController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Eclaim/Create/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClaimRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClaimRequest $request)
    {

        $cnote_no = preg_replace('/\s+/', '', $request->cnote);
        $data = Connote::where('connote', $cnote_no)->first();

        $shipper_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayshipper?pcnote=' . $cnote_no);
        $shipper_array = json_decode(json_encode((array)simplexml_load_string($shipper_xml)), 1);
        $shipper =  $shipper_array['Entry'] ?? null;

        $receiver_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayreceiver?pcnote=' . $cnote_no);
        $receiver_array = json_decode(json_encode((array)simplexml_load_string($receiver_xml)), 1);
        $receiver =  $receiver_array['Entry'] ?? null;

        $detail_xml = file_get_contents('http://hybrid.jne.co.id:9763/services/displayconnote.SOAP12Endpoint/displayconnote1?pcnote=' . $cnote_no);
        $detail_array = json_decode(json_encode((array)simplexml_load_string($detail_xml)), 1);
        $detail =  $detail_array['Entry'] ?? null;
        $detail['connote_date'] = Carbon::createFromFormat('d-M-Y H:i:s', $detail['connote_date'])->format('Y-m-d\TH:i:s');



        $ktp_name = Str::random(7) . time() . '.' . $request->file('ktp')->getClientOriginalExtension();
        $uploadktp = Image::make($request->file('ktp'))->save(storage_path('app/public/client_upload/' . $ktp_name), 60);

        $nota_name = Str::random(7) . time() . '.' . $request->file('ktp')->getClientOriginalExtension();
        $uploadnota = Image::make($request->file('nota'))->save(storage_path('app/public/client_upload/' . $nota_name), 60);

        $rekening_name = Str::random(7) . time() . '.' . $request->file('ktp')->getClientOriginalExtension();
        $uploadrekening = Image::make($request->file('rekening'))->save(storage_path('app/public/client_upload/' . $rekening_name), 60);

        $request['asuransi'] = $detail['insurance_value'] > 0 ? 'yes' : 'no';
        $request['status'] =  'open';
        $request['ticket_id'] =  'CLM' . date('d') . strtoupper(Str::random(4)) . date('ym');

        $request['complainant_idcard'] = 'client_upload/' . $ktp_name;
        $request['complainant_nota'] = 'client_upload/' . $nota_name;
        $request['complainant_bank'] = 'client_upload/' . $rekening_name;
        $request['penawaran_asuransi'] = $request->penawaran_asuransi ?? 'yes';
        $request['penawaran_packing'] = $request->packing == 'yes' ? 'yes' : $request->penawaran_packing ?? 'yes';
        $request['signature'] = time() . Str::random(7);

        if (!$shipper || !str_contains($shipper['origin'], 'KDR')) {
            return redirect()->route('eclaim.create')->with('_error', 'Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 1');
        }

        try {
            DB::beginTransaction();
            if (!$data) {
                $generateAwb = Connote::create($detail);
                $generateAwb->receiver()->create($receiver);
                $generateAwb->shipper()->create($shipper);
                $generateAwb->claim()->create($request->all());
            } else {
                $data->claim()->create($request->all());
            }
            DB::commit();
        } catch (Exception  $e) {
            DB::rollBack();
            return redirect()->route('eclaim.create')->with('_error', 'Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 2');
        }

        $claim = $request->all();
        $send_to =  $request['complainant_email'];
        Mail::to($send_to)->send(new CreateClaimMail($claim));

        if ($request->header('referer') == route('claim.customer')) {
            return redirect()->route('claim.customerthanks', $request['ticket_id']);
        } else {
            return redirect()->route('eclaim.open')->with(['_success' => 'Data Berhasil Ditambahkan']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Claim  $claim
     * @return \Illuminate\Http\Response
     */
    public function show(Claim $claim)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Claim  $claim
     * @return \Illuminate\Http\Response
     */
    public function edit(Claim $claim)
    {
        return Inertia::render('Eclaim/Edit/Edit', [
            'claim' => $claim->load('cnote', 'cnote.shipper', 'cnote.receiver')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClaimRequest  $request
     * @param  \App\Models\Claim  $claim
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClaimRequest $request, Claim $claim)
    {
        dd($claim);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Claim  $claim
     * @return \Illuminate\Http\Response
     */
    public function destroy(Claim $claim)
    {
        //
    }



    public function open()
    {
        return Inertia::render('Eclaim/Open/Open', [
            'claim' =>  Claim::query()->with('cnote:id,connote', 'cnote.shipper:connote_id,origin', 'cnote.receiver:connote_id,destination')
                ->when(request('search'), function ($query, $search) {
                    $query->where(strtolower('ticket_id'), 'like', strtolower('%' . $search . '%'))
                        ->orWhereHas('cnote', function ($query) use ($search) {
                            $query->where(strtolower('connote'), 'like', strtolower('%' . $search . '%'));
                        })->orWhereHas('cnote.shipper', function ($query) use ($search) {
                            $query->where(strtolower('origin'), 'like', strtolower('%' . $search . '%'));
                        })->orWhereHas('cnote.receiver', function ($query) use ($search) {
                            $query->where(strtolower('destination'), 'like', strtolower('%' . $search . '%'));
                        });
                })
                ->where('status', 'open')
                ->select('id', 'connote_id', 'ticket_id', 'complainant_idcard', 'complainant_bank', 'complainant_nota', 'transfer_nota', 'created_at')->paginate(5)->withQueryString(),
            'filterval' => request('search') ?? null
        ]);
    }

    public function proccessdata(Claim $claim)
    {
        try {
            $claim->status = 'processed';
            $claim->processed_at = date('Y-m-d');
            $claim->processed_by = Auth::user()->id;
            $claim->save();
            return redirect()->route('eclaim.open')->with('_success', 'data berhasil diproccess');
        } catch (\Throwable $th) {
            return redirect()->route('eclaim.open')->with('_error', 'data gagal di proccess, silahkan refresh browser terlebih dahulu');
        }
    }

    public function processed()
    {
        return Inertia::render('Eclaim/Processed/Processed', [
            'claim' =>  Claim::query()->with('cnote:id,connote', 'cnote.shipper:connote_id,origin', 'cnote.receiver:connote_id,destination', 'processedby:id,username')
                ->when(request('search'), function ($query, $search) {
                    $query->where(strtolower('ticket_id'), 'like', strtolower('%' . $search . '%'))
                        ->orWhereHas('cnote', function ($query) use ($search) {
                            $query->where(strtolower('connote'), 'like', strtolower('%' . $search . '%'));
                        })->orWhereHas('cnote.shipper', function ($query) use ($search) {
                            $query->where(strtolower('origin'), 'like', strtolower('%' . $search . '%'));
                        })->orWhereHas('cnote.receiver', function ($query) use ($search) {
                            $query->where(strtolower('destination'), 'like', strtolower('%' . $search . '%'));
                        })->orWhereHas('processedby', function ($query) use ($search) {
                            $query->where(strtolower('username'), 'like', strtolower('%' . $search . '%'));
                        });
                })
                ->where('status', 'processed')
                ->select('id', 'connote_id', 'ticket_id', 'complainant_idcard', 'complainant_bank', 'complainant_nota', 'transfer_nota', 'created_at', 'processed_at', 'processed_by', 'claim_propose')->paginate(5)->withQueryString(),
            'filterval' => request('search') ?? null
        ]);
    }
    public function closed()
    {

        return Inertia::render(
            'Eclaim/Closed/Index'
        );
    }

    public function approved(Request $request, Claim $claim)
    {
        dd($claim->complainant_addr);
        $request->validate([
            "claim_approved" => ['integer', 'required'],
            "reason" => ['required', 'string', 'max:225'],
            "penyelesaian" => ['required', 'string', 'max:225'],
            "pembebanan" => ['required', 'string', 'max:225'],
            "transfer" => ['required', 'image', 'max:3027']
        ], [
            "*.required" => "Input Wajib Diisi",
            "*.integer" => "Hanya dapat di isi dengan angka",
            "*.string" => "Hanya dapat di isi dengan alphanumeric",
            "*.max" => "upload maksimal 3bm",
            "*.image" => 'file harus berupa gambar (jpg, jpeg, png, bmp, gif, svg, or webp)',
        ]);

        $bukti_transfer = Str::random(7) . time() . '.' . $request->file('transfer')->getClientOriginalExtension();
        $upload_transfer = Image::make($request->file('transfer'))->save(storage_path('app/public/client_upload/' . $bukti_transfer), 60);

        $request['status'] = 'approved';
        $request['closed_by'] = Auth::user()->id;
        $request['closed_at'] = date('Y-m-d');
        $request['transfer_nota'] = 'client_upload/' . $bukti_transfer;

        try {
            $claim->update($request->all());
            $claim->save();
        } catch (\Throwable $th) {
            throw ValidationException::withMessages([
                'claim_approved' => 'update error, refresh browser anda terlebih dahulu',
            ]);
        }

        return redirect()->route('eclaim.processed')->with('_success', 'Data Berhasil Diubah');
    }

    public function rejected(Request $request, Claim $claim)
    {
        $request->validate([
            "reason" => ['required', 'string'],
        ], [
            "*.required" => "Input Wajib Diisi",
            "*.integer" => "Hanya dapat di isi dengan angka",
            "*.string" => "Hanya dapat di isi dengan alphanumeric",
        ]);

        $request['status'] = 'rejected';
        $request['closed_by'] = Auth::user()->id;
        $request['closed_at'] = date('Y-m-d');

        try {
            $claim->update($request->all());
            $claim->save();
            return redirect()->route('eclaim.processed')->with('_success', 'Data Berhasil Diubah');
        } catch (\Throwable $th) {
            throw ValidationException::withMessages([
                'claim_approved' => 'update error, refresh browser anda terlebih dahulu',
            ]);
        }
    }

    public function exportpdf($ticket_id)
    {
        $claim = Claim::where('ticket_id', $ticket_id)->first();
        $pdf = App::make('dompdf.wrapper');
        $pdf->setOption(['isPhpEnabled' => true, 'dpi' => 150, 'isHtml5ParserEnabled' => true])->setPaper('a4');
        $pdf->loadView('exportpdf.pengajuanclaim', ['claim' => $claim]);
        return $pdf->stream();
    }

    public function clientpdf($ticket_id)
    {
        $claim = Claim::where('ticket_id', $ticket_id)->first();
        $pdf = App::make('dompdf.wrapper');
        $pdf->setOption(['isPhpEnabled' => true, 'dpi' => 150, 'isHtml5ParserEnabled' => true])->setPaper('a4');
        $pdf->loadView('exportpdf.pengajuanclaimcustomer', ['claim' => $claim]);
        return $pdf->stream();
    }

    public function signature($ticket_id)
    {
        $data = Claim::query()->where('ticket_id', $ticket_id)->first();
        return Inertia::render('Eclaim/Signature/Signature', [
            'data' => $data
        ]);
    }

    public function customer()
    {
        return Inertia::render('Eclaim/Customer/Claim');
    }

    public function customerthanks($ticket_id)
    {
        $claim = Claim::query()->select('ticket_id', 'complainant_email')->where('ticket_id', $ticket_id)->first();
        return Inertia::render('Eclaim/Customer/Thanks', [
            'awb' => $claim
        ]);
    }
}
