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
        if ($request->get('sessionId')) {
            $sshAction = Cache::get($request->get('sessionId'));
            if (!$sshAction) {
                return redirect(route('ssh'));
            }
            $output = trim(mb_convert_encoding($sshAction->execute('whoami'), 'UTF-8'));
            $output .= '@' . trim(mb_convert_encoding($sshAction->execute('hostname'), 'UTF-8'));
            if ($kickStartCommand = Cache::get($request->get('sessionId') . 'kickStartCommand')) {
                $output .= PHP_EOL . 'Kick-start command: ' . $kickStartCommand;
                $sshAction->execute($kickStartCommand);
            }
            return inertia('SSHConnection', [
                'output' => $output
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
                $sshAction->execute($validated['kickStartCommand']);
                Cache::put($sessionId . 'kickStartCommand', $validated['kickStartCommand'], now()->addMinutes(60));
            }

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
