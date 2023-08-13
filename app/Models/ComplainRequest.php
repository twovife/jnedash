<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_request',
        'connote_id',
        'caller_category',
        'caller_sub_category',
        'caller_contact_name',
        'caller_contact_person',
        'case_reason',
        'request_status',
    ];

    public function cnote()
    {
        return $this->belongsTo(Connote::class, 'connote_id', 'id');
    }

    public function callers()
    {
        return $this->belongsTo(ComplainCaller::class, 'caller_category', 'id');
    }

    public function scopeWithFilters($query)
    {
        $query->when(request()->input('created_at', []), fn ($que) => $que->whereDateBetween('created_at', request()->input('created_at')))
            ->when(request()->input('connote', []), fn ($que) => $que->whereHas('cnote', fn ($que) => $que->withFilters()));
    }
}
