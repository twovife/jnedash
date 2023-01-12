<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainSource extends Model
{
    use HasFactory;
    protected $fillable = [
        'source',
        'sub_source'
    ];
}
