<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connote extends Model
{
    use HasFactory;

    protected $fillable = [
        'receiving_no',
        'connote',
        'connote_date',
        'customer',
        'customer_name',
        'goods_type',
        'goods_description',
        'services_code',
        'payment_type',
        'qty',
        'weight',
        'amount',
        'insurance_value'
    ];



    public function shipper()
    {
        return $this->hasOne(ConnoteShipper::class, 'connote_id', 'id');
    }

    public function receiver()
    {
        return $this->hasOne(ConnoteReceiver::class, 'connote_id', 'id');
    }

    public function claim()
    {
        return $this->hasOne(Claim::class, 'connote_id', 'id');
    }

    public function complainRequest()
    {
        return $this->hasOne(ComplainRequest::class, 'connote_id', 'id')->latest();
    }

    public function scopeWithFilters($query)
    {
        // dd(request()->all());
        // no_request,tanggal_request,cnote,origin,destination,caller,caller_name,caller_cp,case_reason,request_status
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
        });
    }
}
