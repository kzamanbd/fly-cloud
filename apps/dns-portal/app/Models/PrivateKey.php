<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateKey extends Model
{
    use HasFactory;

    protected $fillable = ['site_id', 'name', 'private_key'];
}
