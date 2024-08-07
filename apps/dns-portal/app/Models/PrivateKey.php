<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class PrivateKey extends Model
{
    use HasFactory;

    protected $fillable = ['site_id', 'name', 'private_key', 'public_key'];


    public function getPrivateKeyAttribute($value)
    {
        try {
            return decrypt($value);
        } catch (\Exception $e) {
            return null;
        }
    }
}
