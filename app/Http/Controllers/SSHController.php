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

    public function index(Request $request)
    {
        $sessionId = $request->get('sessionId');
        if ($sessionId) {
            $sshAction = Cache::get($sessionId);
            if (!$sshAction) {
                return redirect(route('ssh'))->with('error', 'Invalid session');
            }
            return inertia('SSHConnection', [
                'output' => ''
            ]);
        }
        return inertia('SSHConnection');
    }

    public function connect(Request $request)
    {
        $validated = $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
            'username' => 'required|string',
            'password' => 'required|string',
            'kickStartCommand' => 'sometimes|string'
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

            if (isset($validated['kickStartCommand'])) {
                $sshAction->execute($validated['kickStartCommand'], $sessionId);
                Cache::put($sessionId . 'kickStartCommand', $validated['kickStartCommand'], now()->addMinutes(60));
            }

            return redirect(route('ssh', ['sessionId' => $sessionId]))->with('success', 'Connected to SSH');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return back()->with('error', 'Failed to connect to SSH');
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

        $sshAction->execute($request->input('command'), $request->input('sessionId'));

        return response()->json([
            'success' => true,
            'sessionId' => $request->input('sessionId'),
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
