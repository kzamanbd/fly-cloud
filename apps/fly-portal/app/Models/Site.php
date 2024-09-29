<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Site extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'path', 'domain', 'username', 'port', 'ip_address', 'php_version', 'database'];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function getRouteKey()
    {
        return $this->uuid;
    }

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });
    }

    public function keys()
    {
        return $this->hasMany(Key::class)->orderBy('created_at', 'desc');
    }
}