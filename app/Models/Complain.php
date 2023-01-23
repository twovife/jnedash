<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complain extends Model
{
    use HasFactory;
    protected $fillable = [
        'branch',
        'complainsource_id',
        'caller_id',
        'caller_name',
        'is_sending_office',
        'connote_id',
        'complain_case_id',
        'zona',
        'case_priority',
        'sla',
        'due_date',
        'sla_status',
        'claim_propose',
        'claim_approve',
        'note',
        'status',
        'user_create',
        'user_closed',
    ];

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }
}
