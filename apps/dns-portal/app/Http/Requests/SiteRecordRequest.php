<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SiteRecordRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'path' => 'required|string'
        ];
    }

    public function formData()
    {
        return [
            'name' => $this->input('name'),
            'username' => $this->input('username'),
            'ip_address' => $this->input('ip_address'),
            'port' => $this->input('port'),
            'domain' => $this->input('domain'),
            'path' => $this->input('path'),
            'php_version' => $this->input('php_version'),
            'database' => $this->input('database')
        ];
    }
}
