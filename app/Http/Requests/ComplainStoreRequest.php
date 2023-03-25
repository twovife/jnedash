<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComplainStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "branch" => ['required', 'integer'],
            "complainsource_id" => ['required', 'integer'],
            "comp_status" => ['required', 'integer'],
            "comp_identiti" => ['required', 'string'],
            "comp_name" => ['string', 'nullable'],
            "comp_phone" => ['string', 'nullable'],
            "complain_case_id" => ['required', 'integer'],
            "sla" => ['required', 'integer'],
            "zona" => ['required', 'string'],
            "case_priority" => ['required', 'string'],
            "claim_propose" => ['integer', 'nullable'],
            "claim_approve" => ['integer', 'nullable'],
            "note" => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            "*.required" => "Input Wajib diisi",
            "*.string" => "Harus berupa string",
            "*.integer" => "Harus berupa angka"
        ];
    }
}
