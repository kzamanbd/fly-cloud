<?php

namespace App\Http\Controllers;

use App\Actions\DNSAction;
use App\Actions\SSHAction;
use Illuminate\Http\Request;

class DNSController extends Controller
{

    public function __construct(protected DNSAction $dnsAction)
    {
        //
    }

    public function index()
    {
        $zones = $this->dnsAction->getZones();
        return inertia('DNSRecords', [
            'zones' => $zones['result'],
        ]);
    }

    public function getDNSRecords($zoneId)
    {
        $records = $this->dnsAction->getRecords($zoneId);
        return response()->json($records);
    }

    public function store(Request $request, $zoneId)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'name' => 'required|string',
            'content' => 'required|string',
        ]);

        $this->dnsAction->createRecord($zoneId, $validated['type'], $validated['name'], $validated['content']);

        return redirect()->route('dns.index', ['zoneId' => $zoneId]);
    }
}
