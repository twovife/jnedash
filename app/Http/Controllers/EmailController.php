<?php

namespace App\Http\Controllers;

use App\Mail\CreateClaimMail;
use App\Models\Claim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function createclaim($ticket_id)
    {
        $claim = Claim::select('ticket_id', 'complainant_email')->where('ticket_id', $ticket_id)->first();
        $send_to = $claim->complainant_email;
        Mail::to($send_to)->send(new CreateClaimMail($claim));
    }
}
