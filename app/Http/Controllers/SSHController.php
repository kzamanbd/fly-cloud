<?php

namespace App\Http\Controllers;

use App\Actions\SSHAction;
use App\Events\SshOutput;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SSHController extends Controller
{

    public function __construct()
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

        $sshAction = new SSHAction();

        try {
            $sshAction->connectWithPassword(
                $validated['host'],
                $validated['port'],
                $validated['username'],
                $validated['password']
            );

            $sessionId = uniqid('ssh_', true);
            Cache::put($sessionId, $sshAction, now()->addMinutes(60)); // Adjust session duration as needed
            $request->session()->put('sshSessionId', $sessionId);
            $output = $sshAction->execute('whoami');
            Log::info($output);
            return redirect(route('ssh', ['sessionId' => $sessionId]));
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

        $sshAction = Cache::get($request->input('sessionId'));
        if (!$sshAction) {
            return response()->json(['error' => 'Invalid session'], 400);
        }

        // $this->sshAction->connectWithPassword(
        //     $cacheKey['host'],
        //     $cacheKey['port'],
        //     $cacheKey['username'],
        //     $cacheKey['password']
        // );

        $output = $sshAction->execute($request->input('command'));

        broadcast(new SshOutput($request->input('sessionId'), $output));

        return response()->json([
            'success' => true,
            'sessionId' => $request->input('sessionId'),
            'output' => $output
        ]);
    }

    public function killSession(Request $request)
    {
        $request->validate(['sessionId' => 'required|string']);

        $sshAction = Cache::pull($request->input('sessionId'));
        if ($sshAction) {
            $sshAction->disconnect();
        }

        return response()->json(['success' => true]);
    }
}
