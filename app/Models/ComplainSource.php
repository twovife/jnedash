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

    public function scopeWithFilters($query)
    {
        $query->when(request()->input('source', []), fn ($que) => $que->likeLower('source', request()->input('source'))->orLikeLower('sub_source', request()->input('source')));
    }
}
