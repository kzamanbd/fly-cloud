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

    public function index($zoneId = null)
    {
        $records = [
            'result' => [],
        ];
        if ($zoneId) {
            $records = $this->dnsAction->getRecords($zoneId);
        }
        $zones = $this->dnsAction->getZones();
        return inertia('DNSRecords', [
            'records' => $records['result'],
            'zones' => $zones['result'],
        ]);
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
