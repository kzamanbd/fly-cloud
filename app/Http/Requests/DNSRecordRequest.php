<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DNSRecordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string',
            'name' => 'required|string',
            'content' => 'required|string',
            'ttl' => 'required',
            'proxied' => 'required|boolean',
        ];
    }

    public function formData()
    {
        return [
            'type' => $this->type,
            'name' => $this->name,
            'content' => $this->content,
            'ttl' => $this->ttl,
            'proxied' => $this->proxied,
        ];
    }
}
