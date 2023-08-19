<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConnoteReceiver extends Model
{
    use HasFactory;
    protected $fillable = [
        'connote_id',
        'destination',
        'receiver_name',
        'address',
        'city',
        'phone',
    ];

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }
}
