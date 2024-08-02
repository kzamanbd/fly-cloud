<?php

namespace App\Http\Controllers;

use App\Actions\SSHAction;
use Illuminate\Http\Request;

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
            $this->sshAction->connectWithPassword(
                $validated['host'],
                $validated['port'],
                $validated['username'],
                $validated['password']
            );
            // event(new \App\Events\SSHEvent());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
