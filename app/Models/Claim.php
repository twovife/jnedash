<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'connote_id',
        'source',
        'ticket_id',
        'case',
        'complainant',
        'complainant_addr',
        'complainant_email',
        'complainant_number',
        'complainant_idcard',
        'complainant_idcard_number',
        'complainant_bank',
        'complainant_bank_number',
        'complainant_bank_name',
        'complainant_bank_branch',
        'complainant_bank_username',
        'complainant_nota',
        'complainant_resi',
        'packing',
        'packer',
        'penawaran_packing',
        'asuransi',
        'penawaran_asuransi',
        'claim_propose',
        'claim_approved',
        'status',
        'reason',
        'penyelesaian',
        'pembebanan',
        'processed_by',
        'closed_by',
        'sla',
        'status_sla',
        'processed_at',
        'closed_at',
        'transfer_nota',
        'signature',
    ];

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }

    public function processedby()
    {
        return $this->belongsTo(User::class, 'processed_by', 'id');
    }

    public function closedby()
    {
        return $this->belongsTo(User::class, 'processed_by', 'id');
    }

    public function scopeWithFilters($query)
    {
        //
    }
}
