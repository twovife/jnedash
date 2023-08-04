<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainComment extends Model
{
    use HasFactory;

    public function complain()
    {
        return $this->belongsTo(Complain::class);
    }

    public function usercomment()
    {
        return $this->belongsTo(User::class, 'user_comment', 'id');
    }


    protected $fillable = [
        'complain_id',
        'comment',
        'user_comment'
    ];
}
