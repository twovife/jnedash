<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complain extends Model
{
    use HasFactory;
    protected $fillable = [
        'no_ticket',
        'branch',
        'complainsource_id',
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
        'followup_by',
    ];



    public function source()
    {
        return $this->belongsTo(ComplainSource::class, 'complainsource_id', 'id');
    }

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }

    public function ticketcase()
    {
        return $this->belongsTo(ComplainCase::class, 'complain_case_id', 'id');
    }

    public function complainment()
    {
        return $this->hasOne(Complainment::class, 'complain_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(ComplainComment::class, 'complain_id', 'id');
    }

    public function comment()
    {
        return $this->hasOne(ComplainComment::class, 'complain_id', 'id')->latest();
    }

    public function usercreate()
    {
        return $this->belongsTo(User::class, 'user_create', 'id');
    }
    public function userclosed()
    {
        return $this->belongsTo(User::class, 'user_closed', 'id');
    }
}
