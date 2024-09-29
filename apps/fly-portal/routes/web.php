<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SSHController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DNSRecordController;
use App\Http\Controllers\MagicLoginController;
use App\Http\Controllers\SiteRecordController;

Route::get('/', fn() => redirect('/servers'));

Route::middleware('auth')->group(function () {

    Route::get('/servers', [ServerController::class, 'index'])->name('dashboard');
    Route::get('/servers/create', [ServerController::class, 'create'])->name('servers.create');
    Route::resources(['sites' => SiteRecordController::class]);

    Route::get('console', [SSHController::class, 'console'])->name('console');
    Route::get('dns', [DNSRecordController::class, 'index'])->name('dns.index');
    Route::post('dns/{zoneId}', [DNSRecordController::class, 'store'])->name('dns.store');
    Route::post('dns/{zoneId}/{recordId}', [DNSRecordController::class, 'update'])->name('dns.update');
    Route::get('dns/records/{zoneId}', [DNSRecordController::class, 'getDNSRecords'])->name('dns.records');
    Route::get('magic-login', MagicLoginController::class)->name('wp.login');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
