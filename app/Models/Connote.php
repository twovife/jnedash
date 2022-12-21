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
}
