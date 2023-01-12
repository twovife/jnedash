<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOffice extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_agen',
        'nomor_debitur',
    ];
}
