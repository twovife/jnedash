<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConnoteShipper extends Model
{
    use HasFactory;

    protected $fillable = [
        'connote_id',
        'origin',
        'shipper_name',
        'address',
        'city',
        'phone',
    ];

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }
}
