<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClaimRequest extends FormRequest
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
            'case' => ['required', 'string', 'max:225'],
            'cnote' => ['required', 'string', 'max:225', 'unique:connotes,connote'],
            'complainant' => ['required', 'string', 'max:255'],
            'complainant_addr' => ['required', 'string', 'max:225'],
            'complainant_number' => ['required', 'string', 'max:225'],
            'packing' => ['required', 'string', 'max:225'],
            'claim_propose' => ['required', 'integer', 'min:1'],
            'ktp' => ['required', 'image', 'file', 'max:3027'],
            'rekening' => ['required', 'image', 'max:3027'],
            'nota' => ['required', 'image', 'max:3027']
        ];
    }

    public function messages()
    {
        return [
            '*.required' => 'Input wajib di isi',
            '*.integer' => 'Input harus berupa angka',
            'case.max' => 'Karakter tidak boleh lebih dari 255',
            'cnote.max' => 'Karakter tidak boleh lebih dari 255',
            'complainant.max' => 'Karakter tidak boleh lebih dari 255',
            'complainant_addr.max' => 'Karakter tidak boleh lebih dari 255',
            'complainant_number.max' => 'Karakter tidak boleh lebih dari 255',
            'packing.max' => 'Karakter tidak boleh lebih dari 255',
            'claim_propose.min' => 'Minimal pengajuan claim adalah 1 rupiah',
            '*.image' => 'file harus berupa gambar (jpg, jpeg, png, bmp, gif, svg, or webp)',
            'ktp.max' => 'maksimal upload 3mb',
            'rekening.max' => 'maksimal upload 3mb',
            'nota.max' => 'maksimal upload 3mb'
        ];
    }
}
