<?php

namespace App\Http\Controllers;

use App\Exports\MonitoringExport;
use App\Models\Claim;
use App\Http\Requests\StoreClaimRequest;
use App\Http\Requests\UpdateClaimRequest;
use App\Mail\ApprovedClaimMail;
use App\Mail\CreateClaimMail;
use App\Mail\RejectedClaimMail;
use App\Models\Connote;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Intervention\Image\Facades\Image;

class ClaimController extends Controller
{
    // used
    public function index()
    {

        Session::put('last_claim', request()->all());

        $queries = Claim::with('cnote', 'processedby', 'closedby')
            ->withFilters()
            ->limit(5000)
            ->orderBy('created_at', 'desc')
            ->get();

        $data = collect($queries)->map(fn ($que) => [
            'id' => $que->id ?? null,
            'ticket_id' => $que->ticket_id ?? null,
            'created_at' => $que->created_at->format('Y-m-d') ?? null,
            'processed_at' => $que->processed_at ? $que->processed_at : null,
            'processed_by' => $que->processedby ? $que->processedby->name : null,
            'closed_at' => $que->closed_at ? $que->closed_at : null,
            'closed_by' => $que->closedby ? $que->closedby->name : null,
            'connote' => $que->cnote ? $que->cnote->connote : null,
            'origin' => $que->cnote ? $que->cnote->origin : null,
            'destination' => $que->cnote ? $que->cnote->destination : null,
            'status_sla' => $que->status_sla ?? null,
            'sla' =>  $que->sla ?? null,
            'claim_propose' => $que->claim_propose ?? null,
            'claim_approved' => $que->claim_approved ?? null,
            'case' => $que->case ?? null,
            'complainant_idcard' => $que->complainant_idcard ?? null,
            'complainant_bank' => $que->complainant_bank ?? null,
            'complainant_nota' => $que->complainant_nota ?? null,
            'transfer_nota' => $que->transfer_nota ?? null,
            'status' => $que->status ?? "open",
        ]);



        return Inertia::render('Csoffice/Eclaim/Index', [
            'responses' => $data,
            'serverFilters' => request()->all()
        ]);
    }


    public function create()
    {
        //
    }

    //used
    public function store(StoreClaimRequest $request)
    {

        $lastRequest = Session::get('last_claim', []);
        Session::forget('last_claim');

        $ktp_name = Str::random(7) . time() . '.' . $request->file('ktp')->getClientOriginalExtension();
        $uploadktp = Image::make($request->file('ktp'))->save(storage_path('app/public/client_upload/' . $ktp_name), 60);

        $nota_name = Str::random(7) . time() . '.' . $request->file('ktp')->getClientOriginalExtension();
        $uploadnota = Image::make($request->file('nota'))->save(storage_path('app/public/client_upload/' . $nota_name), 60);

        $rekening_name = Str::random(7) . time() . '.' . $request->file('ktp')->getClientOriginalExtension();
        $uploadrekening = Image::make($request->file('rekening'))->save(storage_path('app/public/client_upload/' . $rekening_name), 60);

        $data = [
            // "connote_id" => $request->connote_id,
            "source" => $request->source,
            "ticket_id" =>  'CLM' . date('d') . strtoupper(Str::random(4)) . date('ym'),
            "case" => $request->case,
            "complainant" => $request->complainant,
            "complainant_addr" => $request->complainant_addr,
            "complainant_email" => $request->complainant_email,
            "complainant_number" => $request->complainant_number,
            "complainant_idcard" => 'client_upload/' . $ktp_name,
            "complainant_idcard_number" => $request->complainant_idcard_number,
            "complainant_bank" => 'client_upload/' . $rekening_name,
            "complainant_bank_number" => $request->complainant_bank_number,
            "complainant_bank_name" => $request->complainant_bank_name,
            "complainant_bank_branch" => $request->complainant_bank_branch,
            "complainant_bank_username" => $request->complainant_bank_username,
            "complainant_nota" => 'client_upload/' . $nota_name,
            "complainant_resi" => $request->complainant_resi,
            "packing" => $request->packing,
            "packer" => $request->packer,
            "penawaran_packing" => $request->packing == 'yes' ? 'yes' : $request->penawaran_packing ?? 'yes',
            "penawaran_asuransi" =>  $request->penawaran_asuransi ?? 'yes',
            "claim_propose" => $request->claim_propose,
            "status" =>  'open',
            "sla" => Carbon::now()->addDay(7),
            "signature" => time() . Str::random(7),
        ];


        try {
            DB::beginTransaction();
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
                'shipper_phone' => is_array($shippers['phone']) ? 0 : $shippers['phone'],

                'destination' => $receivers['destination'],
                'receiver_name' => $receivers['receiver_name'],
                'receiver_address' => is_array($receivers['address']) ? $receivers['destination'] : $receivers['address'],
                'receiver_city' =>  is_array($receivers['city']) ? $receivers['destination'] : $receivers['city'],
                'receiver_phone' => is_array($receivers['phone']) ? 0 : $receivers['phone'],
            ];
            $fetchConnote = Connote::firstOrCreate(['connote' => $cnote_no], $detail);


            $data['connote_id'] = $fetchConnote->id;
            $data['asuransi'] = $detail['insurance_value'] > 0 ? 'yes' : 'no';
            $storeClaim = Claim::create($data);

            $claim = $data;
            $send_to =  $data['complainant_email'];
            Mail::to($send_to)->send(new CreateClaimMail($claim));
            DB::commit();
        } catch (Exception $e) {
            dd($e);
            return redirect()->back()->withErrors('Terjadi Kesalahan saat input data, mohon refresh browser anda terlebih dahulu 1');
            DB::rollBack();
        }

        return redirect()->route('claim.customerthanks', $data['ticket_id']);
    }


    //   used
    public function show(Claim $claim)
    {
        return $claim->load('cnote', 'processedby', 'closedby');
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
        //
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


    // used
    public function proccessdata(Claim $claim)
    {

        $lastRequest = Session::get('last_claim', []);
        Session::forget('last_claim');

        try {
            $claim->status = 'processed';
            $claim->processed_at = date('Y-m-d');
            $claim->processed_by = Auth::user()->id;
            $claim->save();
        } catch (\Throwable $th) {
            return redirect()->route('csoffice.claim.index', $lastRequest)->withErrors('data gagal di proccess, silahkan refresh browser terlebih dahulu');
        }
        return redirect()->route('csoffice.claim.index', $lastRequest)->with('message', 'data berhasil diproccess');
    }

    // used
    public function approved(Request $request, Claim $claim)
    {

        $lastRequest = Session::get('last_claim', []);
        Session::forget('last_claim');

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



        try {
            DB::beginTransaction();
            $bukti_transfer = Str::random(7) . time() . '.' . $request->file('transfer')->getClientOriginalExtension();
            $upload_transfer = Image::make($request->file('transfer'))->save(storage_path('app/public/client_upload/' . $bukti_transfer), 60);

            $request['status'] = 'approved';
            $request['closed_by'] = Auth::user()->id;
            $request['closed_at'] = date('Y-m-d');
            $request['transfer_nota'] = 'client_upload/' . $bukti_transfer;
            $request['status_sla'] = date('Y-m-d') > $claim->sla ? 'over sla' : 'sla';

            $claim->update($request->all());
            $claim->save();
            DB::commit();
        } catch (Exception $e) {
            throw ValidationException::withMessages([
                'claim_approved' => 'update error, refresh browser anda terlebih dahulu',
            ]);
            DB::rollBack();
        }

        Mail::to($claim->complainant_email)->send(new ApprovedClaimMail($claim));
        return redirect()->route('csoffice.claim.index', $lastRequest)->with('message', 'Data Berhasil Diubah');
    }

    // used
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
        $request['status_sla'] = date('Y-m-d') > $claim->sla ? 'over sla' : 'sla';

        try {
            $claim->update($request->all());
            $claim->save();
        } catch (Exception $th) {
            throw ValidationException::withMessages([
                'claim_approved' => 'update error, refresh browser anda terlebih dahulu',
            ]);
        }

        Mail::to($claim->complainant_email)->send(new RejectedClaimMail($claim));
        return redirect()->route('csoffice.claim.index')->with('message', 'Data Berhasil Diubah');
    }


    // used
    public function monitoring()
    {
        return Inertia::render('Eclaim/Monitoring/Monitoring', [
            'claim' =>  Claim::query()->with('cnote', 'cnote.shipper', 'cnote.receiver', 'processedby', 'closedby')
                ->when(request('search'), function ($query, $search) {
                    $query->where(strtolower('ticket_id'), 'like', strtolower('%' . $search . '%'))
                        ->orWhere(strtolower('status_sla'), strtolower($search))
                        ->orWhere(strtolower('status'), 'like', strtolower('%' . $search . '%'))
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
                ->when(request('datefrom'), function ($query, $search) {
                    $query->whereDate('created_at', '>=', $search);
                }, function ($query) {
                    $query->whereDate('created_at', '>=', Carbon::today()->subDays(30)->format('Y-m-d'));
                })
                ->when(request('datethru'), function ($query, $search) {
                    $query->whereDate('created_at', '<=', $search);
                }, function ($query) {
                    $query->whereDate('created_at', '<=', Carbon::today()->format('Y-m-d'));
                })
                ->whereNotNull('id')
                ->paginate(5)
                ->withQueryString(),
            'filterval' => request('search') ?? null,
            'filterfrom' => request('datefrom') ?? Carbon::today()->subDays(30)->format('Y-m-d'),
            'filterthru' => request('datethru') ?? Carbon::today()->format('Y-m-d')
        ]);
    }

    //used
    public function exportpdf($ticket_id)
    {
        $claim = Claim::where('ticket_id', $ticket_id)->first();
        $pdf = App::make('dompdf.wrapper');
        $pdf->setOption(['isPhpEnabled' => true, 'dpi' => 150, 'isHtml5ParserEnabled' => true])->setPaper('a4');
        $pdf->loadView('exportpdf.pengajuanclaim', ['claim' => $claim]);
        return $pdf->stream();
    }

    // used
    public function clientpdf($ticket_id)
    {
        $claim = Claim::where('ticket_id', $ticket_id)->first();
        $pdf = App::make('dompdf.wrapper');
        $pdf->setOption(['isPhpEnabled' => true, 'dpi' => 150, 'isHtml5ParserEnabled' => true])->setPaper('a4');
        $pdf->loadView('exportpdf.pengajuanclaimcustomer', ['claim' => $claim]);
        return $pdf->stream();
    }


    // used
    public function signature($ticket_id)
    {
        $data = Claim::query()->where('ticket_id', $ticket_id)->first();
        return Inertia::render('Eclaim/Signature/Signature', [
            'data' => $data
        ]);
    }

    // used
    public function customer()
    {
        return Inertia::render('Eclaim/Customer/Claim');
    }


    // used
    public function customerthanks($ticket_id)
    {
        $claim = Claim::query()->select('ticket_id', 'complainant_email')->where('ticket_id', $ticket_id)->first();
        return Inertia::render('Eclaim/Customer/Thanks', [
            'awb' => $claim
        ]);
    }

    public function exportExcell()
    {
        $claim =   Claim::query()->with('cnote', 'cnote.shipper', 'cnote.receiver', 'processedby', 'closedby')
            ->when(request('search'), function ($query, $search) {
                $query->where(strtolower('ticket_id'), 'like', strtolower('%' . $search . '%'))
                    ->orWhere(strtolower('status_sla'), strtolower($search))
                    ->orWhere(strtolower('status'), 'like', strtolower('%' . $search . '%'))
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
            ->when(request('datefrom'), function ($query, $search) {
                $query->whereDate('created_at', '>=', $search);
            }, function ($query) {
                $query->whereDate('created_at', '>=', Carbon::today()->subDays(2)->format('Y-m-d'));
            })
            ->when(request('datethru'), function ($query, $search) {
                $query->whereDate('created_at', '<=', $search);
            }, function ($query) {
                $query->whereDate('created_at', '<=', Carbon::today()->format('Y-m-d'));
            })
            ->get()->map(fn ($query) => [
                "Tanggal Ticketing" => $query->created_at,
                "Nomor Ticket" => $query->ticket_id,
                "Nomor Resi" => $query->cnote->connote,
                "Origin" => $query->cnote->shipper->origin,
                "Destination" => $query->cnote->receiver->destination,
                "Service" => $query->cnote->services_code,
                "Shipper" => $query->cnote->shipper->shipper_name,
                "Shipper Telp" => $query->cnote->shipper->phone,
                "Cnee" => $query->cnote->receiver->receiver_name,
                "Cnee Telp" => $query->cnote->receiver->phone,
                "Pelapor" => $query->complainant,
                "Pelapor Telp" => $query->complainant_number,
                "Pelapor Email" => $query->complainant_email,
                "Case" => $query->case,
                "Good Description" => $query->cnote->goods_description,
                "Nilai Barang" => $query->cnote->amount,
                "Packing Kayu" => $query->packing,
                "PIC Packing" => $query->packer,
                "Penawaran Packing" => $query->penawaran_packing,
                "Asuransi" => $query->asuransi,
                "Penawaran Asuransi" => $query->penawaran_asuransi,
                "Claim Propose" => $query->claim_propose,
                "Claim Approve" => $query->claim_approved,
                "Penyelesaian" => $query->penyelesaian,
                "Pembebanan" => $query->pembebanan,
                "SLA" => $query->sla,
                "Status SLA" => $query->status_sla ?? "sla",
                "Status Claim" => $query->status,
                "Tanggal Processed" => $query->processed_at,
                "PIC Processed" => $query->processedby ? $query->processedby->username : "",
                "Tanggal Closed" => $query->closed_at,
                "PIC Closed" =>  $query->closedby ? $query->closedby->username : "",
                'KTP' => asset('storage/' . $query->complainant_idcard),
                'Buku Tabungan' => asset('storage/' . $query->complainant_bank),
                'Nota Pembelian' => asset('storage/' . $query->complainant_nota),
                'Bukti Transfer' => asset('storage/' . $query->transfer_nota),
            ]);
        return (new MonitoringExport($claim))->download('Claim.xlsx');
    }
}
