<?php

namespace App\Http\Controllers;

use App\Actions\SSHAction;
use App\Events\SshOutput;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SSHController extends Controller
{

    public function __construct(protected SSHAction $sshAction)
    {
        //
    }

    public function index()
    {
        return inertia('SSHConnection');
    }

    public function connect(Request $request)
    {
        $validated = $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        try {
            $ssh = $this->sshAction->connectWithPassword(
                $validated['host'],
                $validated['port'],
                $validated['username'],
                $validated['password']
            );

            $sessionId = uniqid('ssh_', true);
            Cache::put($sessionId, [
                'host' => $validated['host'],
                'port' => $validated['port'],
                'username' => $validated['username'],
                'password' => $validated['password'],
            ], now()->addMinutes(60)); // Adjust session duration as needed
            $request->session()->put('sshSessionId', $sessionId);
            broadcast(new SshOutput($sessionId, $ssh->exec('whoami'))); // Send initial output
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }

    public function execute(Request $request)
    {
        $request->validate([
            'sessionId' => 'required|string',
            'command' => 'required|string',
        ]);

        $cacheKey = Cache::get($request->input('sessionId'));
        if (!$cacheKey) {
            return response()->json(['error' => 'Invalid session'], 400);
        }

        $this->sshAction->connectWithPassword(
            $cacheKey['host'],
            $cacheKey['port'],
            $cacheKey['username'],
            $cacheKey['password']
        );

        $output = $this->sshAction->execute($request->input('command'));

        broadcast(new SshOutput($request->input('sessionId'), $output));

        return response()->json([
            'success' => true,
            'sessionId' => $request->input('sessionId'),
            'output' => $output
        ]);
    }

    public function stopSession(Request $request)
    {
        $request->validate(['sessionId' => 'required|string']);

        $ssh = Cache::pull($request->input('sessionId'));
        if ($ssh) {
            $ssh->disconnect();
        }

        return response()->json(['success' => true]);
    }
}
