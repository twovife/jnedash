<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainComment extends Model
{
    use HasFactory;
    protected $fillable = [
        'complain_id',
        'comment',
        'user_comment'
    ];
}
