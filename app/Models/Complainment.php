<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complainment extends Model
{
    use HasFactory;
    protected $fillable = [
        'complain_id',
        'comp_status',
        'comp_identiti',
        'comp_name',
        'comp_phone',
    ];

    public function callers()
    {
        return $this->belongsTo(ComplainCaller::class, 'comp_status', 'id');
    }

    public function complain()
    {
        return $this->belongsTo(Complain::class, 'complain_id', 'id');
    }
}
