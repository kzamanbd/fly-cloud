<?php

use App\Http\Controllers\DNSRecordController;
use App\Http\Controllers\MagicLoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteRecordController;
use App\Http\Controllers\SSHController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => redirect('/dashboard'));

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('ssh', [SSHController::class, 'index'])->name('ssh');
    Route::post('ssh', [SSHController::class, 'connect'])->name('ssh.connect');
    Route::post('ssh/exec', [SSHController::class, 'execute'])->name('ssh.exec');
    Route::get('ssh/kill-session', [SSHController::class, 'killSession'])->name('ssh.kill');

    Route::get('dns', [DNSRecordController::class, 'index'])->name('dns.index');
    Route::post('dns/{zoneId}', [DNSRecordController::class, 'store'])->name('dns.store');
    Route::post('dns/{zoneId}/{recordId}', [DNSRecordController::class, 'update'])->name('dns.update');
    Route::get('dns/records/{zoneId}', [DNSRecordController::class, 'getDNSRecords'])->name('dns.records');
    Route::resources(['sites' => SiteRecordController::class]);
    Route::get('magic-login', MagicLoginController::class)->name('magic-login');
});

require __DIR__ . '/auth.php';


Route::get('/broadcast', function () {
    event(new \App\Events\SSHEvent());
});
