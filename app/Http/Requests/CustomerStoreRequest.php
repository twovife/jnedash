<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerStoreRequest extends FormRequest
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
        return  [
            "caller_category" => 'required',
            "caller_sub_category" => 'required',
            "case_reason" => 'required',
            "cnote" => 'required',
        ];
    }

    public function messages()
    {
        return  [
            "*.required" => 'form wajib di isi',
        ];
    }
}
