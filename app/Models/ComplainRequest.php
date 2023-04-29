<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'connote_id',
        'caller_category',
        'caller_sub_category',
        'caller_contact_name',
        'caller_contact_person',
        'case_reason',
        'request_status',
    ];

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }

    public function callers()
    {
        return $this->belongsTo(ComplainCaller::class, 'caller_category', 'id');
    }

    public function scopeWithFilters($query)
    {
        // no_request,tanggal_request,cnote,origin,destination,caller,caller_name,caller_cp,case_reason,request_status

        // id, connote_id, no_request, caller_category, caller_sub_category, caller_contact_name, caller_contact_person, case_reason, request_status, created_at, updated_at
        // return $query->when(count(request()->input('data.cnote', [])), function ($query) {
        //     $query->whereIn('connote', request()->input('data.cnote'));
        // });

        return $query->when(request()->data['find'], function ($q) {
            $keys = request()->data['find'];
            $keys = array_map('strtolower', $keys);
            $q->whereIn('id', request()->data['find'])
                ->orWhereIn('connote_id', $keys)
                ->orWhereIn('no_request', $keys)
                ->orWhereIn('caller_category', $keys)
                ->orWhereIn('caller_sub_category', $keys)
                ->orWhereRaw('LOWER(`caller_contact_name`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`caller_contact_person`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`case_reason`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`request_status`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys);
        })->whereHas('cnote', function ($q) use ($query) {
            $q->withFilters();
        });
    }
}
