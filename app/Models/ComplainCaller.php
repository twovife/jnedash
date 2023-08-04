<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainCaller extends Model
{
    use HasFactory;

    protected $fillable = [
        'caller',
    ];

    public function scopeWithFilters($query)
    {
        $query->when(request()->input('caller_category', []), fn ($que) => $que->likeLower('caller', request()->input('caller_category')))
            ->when(request()->input('caller', []), fn ($que) => $que->likeLower('caller', request()->input('caller')));
    }
}
