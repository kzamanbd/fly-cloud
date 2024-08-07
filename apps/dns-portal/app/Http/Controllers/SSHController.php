<?php

namespace App\Http\Controllers;

use App\Actions\SSHAction;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SSHController extends Controller
{
    public function index(Request $request)
    {
        $site = array();
        $uuid = $request->get('uuid');
        if ($uuid) {
            $site = Site::where('uuid', $uuid)->first();
        }

        return inertia('SSHConnection', [
            'site' => $site
        ]);
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

            return response()->json([
                'sessionId' => $sessionId,
                'message' => 'Connected SSH successfully'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
