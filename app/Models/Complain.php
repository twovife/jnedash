<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
        'caller_category',
        'caller_sub_category',
        'caller_contact_name',
        'caller_contact_person',

    ];



    public function source()
    {
        return $this->belongsTo(ComplainSource::class, 'complainsource_id', 'id');
    }

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }

    public function callers()
    {
        return $this->belongsTo(ComplainCaller::class, 'caller_category', 'id');
    }

    public function ticketcase()
    {
        return $this->belongsTo(ComplainCase::class, 'complain_case_id', 'id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_create', 'id');
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

    public function scopeWhereLower($query, $columnName, $value)
    {
        return $query->whereRaw('LOWER(' . DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName . ') = ?', [strtolower($value)]);
    }

    public function scopeWithFilters($query)
    {

        // $query->with(['cnote' => function ($que) {
        //     return $que->where('connote', 'kediri');
        // }])
        // return $this->with(['cnote'=>function($que)use($query)]);
        // $query
        //     ->whereHas('cnote', fn ($que) => $que->withFilters())
        //     ->whereHas('creator', fn ($que) => $que->withFilters())
        //     ->whereHas('callers', fn ($que) => $que->withFilters())
        $query->when(request()->input('id', []), fn ($que) => $que->where('id', request()->input('id')))
            ->when(request()->input('no_ticket', []), fn ($que) => $que->where('no_ticket', request()->input('no_ticket')))
            ->when(request()->input('branch', []), fn ($que) => $que->whereLower('branch', request()->input('branch')))
            ->when(request()->input('source', []), fn ($que) => $que->whereHas('source', fn ($que) => $que->withFilters()))
            ->when(request()->input('user_create', []), fn ($que) => $que->whereHas('creator', fn ($que) => $que->withFilters()))
            ->when(request()->input('created_at', []), fn ($que) => $que->whereDateBetween('created_at', request()->input('created_at')))
            ->when(request()->input('caller_category', []), fn ($que) => $que->whereHas('callers', fn ($que) => $que->withFilters()))
            ->when(request()->input('caller_sub_category', []), fn ($que) => $que->likeLower('caller_sub_category', request()->input('caller_sub_category')))
            ->when(request()->input('caller_contact_name', []), fn ($que) => $que->likeLower('caller_contact_name', request()->input('caller_contact_name')))
            ->when(request()->input('caller_contact_person', []), fn ($que) => $que->likeLower('caller_contact_person', request()->input('caller_contact_person')))
            ->when(request()->input('connote', []), fn ($que) => $que->whereHas('cnote', fn ($que) => $que->withFilters()))
            ->when(request()->input('status', []), fn ($que) => $que->likeLower('status', request()->input('status')))
            ->when(request()->input('note', []), fn ($que) => $que->likeLower('note', request()->input('note')))
            ->when(request()->input('followup_by', []), fn ($que) => $que->whereLower('followup_by', request()->input('followup_by')));
    }
}












// ->when(request()->input('connote_date',[]),fn($que)=>$que->where('connote_date',request()->input('connote_date')))
// ->when(request()->input('shipper_name',[]),fn($que)=>$que->where('shipper_name',request()->input('shipper_name')))
// ->when(request()->input('shipper_phone',[]),fn($que)=>$que->where('shipper_phone',request()->input('shipper_phone')))
// ->when(request()->input('receiver_name',[]),fn($que)=>$que->where('receiver_name',request()->input('receiver_name')))
// ->when(request()->input('receiver_address',[]),fn($que)=>$que->where('receiver_address',request()->input('receiver_address')))
// ->when(request()->input('receiver_phone',[]),fn($que)=>$que->where('receiver_phone',request()->input('receiver_phone')))
// ->when(request()->input('services_code',[]),fn($que)=>$que->where('services_code',request()->input('services_code')))
// ->when(request()->input('category',[]),fn($que)=>$que->where('category',request()->input('category')))
// ->when(request()->input('case',[]),fn($que)=>$que->where('case',request()->input('case')))
// ->when(request()->input('sub_case',[]),fn($que)=>$que->where('sub_case',request()->input('sub_case')))
// ->when(request()->input('case_priority',[]),fn($que)=>$que->where('case_priority',request()->input('case_priority')))
// ->when(request()->input('origin',[]),fn($que)=>$que->where('origin',request()->input('origin')))
// ->when(request()->input('destination',[]),fn($que)=>$que->where('destination',request()->input('destination')))

// ->when(request()->input('sla_status',[]),fn($que)=>$que->where('sla_status',request()->input('sla_status')))
// ->when(request()->input('due_date',[]),fn($que)=>$que->where('due_date',request()->input('due_date')))
