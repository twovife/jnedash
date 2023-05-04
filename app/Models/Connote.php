<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connote extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_request',
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
        'insurance_value',
        'origin',
        'shipper_name',
        'shipper_address',
        'shipper_city',
        'shipper_phone',
        'destination',
        'receiver_name',
        'receiver_address',
        'receiver_city',
        'receiver_phone',
    ];

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
        return $query->when(request()->input('data.find', []), function ($q) {
            $keys = request()->data['find'];
            $keys = array_map('strtolower', $keys);
            $q->whereIn('id', request()->data['find'])
                ->orWhereIn('connote', $keys)
                ->orWhereIn('customer', $keys)
                ->orWhereRaw('LOWER(`customer_name`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`goods_type`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`goods_description`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`services_code`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`payment_type`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`origin`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`destination`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereRaw('LOWER(`shipper_name`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereIn('shipper_phone', $keys)
                ->orWhereRaw('LOWER(`receiver_name`) IN (' . implode(",", array_fill(0, count($keys), '?')) . ')', $keys)
                ->orWhereIn('receiver_phone', $keys);
        })->when(request()->input('data.connote', []), function ($q) {
            $keys = request()->input('data.connote', []);
            $keys = array_map('strtolower', $keys);
            $q->whereIn('connote', $keys);
        })->when(request()->input('data.origin', []), function ($q) {
            $keys = request()->input('data.origin', []);
            $keys = array_map('strtolower', $keys);
            $q->whereIn('origin', $keys);
        })->when(request()->input('data.destination', []), function ($q) {
            $keys = request()->input('data.destination', []);
            $keys = array_map('strtolower', $keys);
            $q->whereIn('destination', $keys);
        })->when(request()->input('data.services_code', []), function ($q) {
            $keys = request()->input('data.services_code', []);
            $keys = array_map('strtolower', $keys);
            $q->whereIn('services_code', $keys);
        });
    }
}


// id, receiving_no, connote, connote_date, customer, customer_name, goods_type, goods_description, services_code, payment_type, qty, weight, amount, insurance_value, zona, origin, destination, shipper_name, shipper_address, shipper_city, shipper_phone, receiver_name, receiver_address, receiver_city, receiver_phone, created_at, updated_at
