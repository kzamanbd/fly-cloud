<?php

namespace App\Http\Controllers;

use App\Actions\DNSAction;
use App\Actions\SSHAction;
use Exception;
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
            'ttl' => 'required|numeric',
            'proxied' => 'required|boolean',
        ]);

        try {
            $this->dnsAction->createRecord($zoneId, $validated);

            return redirect()->route('dns.index', [
                'zoneId' => $zoneId
            ])->with('success', 'Record created successfully');
        } catch (Exception $e) {
            return redirect()->route('dns.index', [
                'zoneId' => $zoneId
            ])->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, $zoneId, $recordId)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'name' => 'required|string',
            'content' => 'required|string',
            'ttl' => 'required|string',
            'proxied' => 'required|boolean',
        ]);

        try {
            $this->dnsAction->updateRecord($zoneId, $recordId, $validated);

            return redirect()->route(
                'dns.index',
                ['zoneId' => $zoneId]
            )->with('success', 'Record updated successfully');
        } catch (Exception $e) {
            return redirect()->route(
                'dns.index',
                ['zoneId' => $zoneId]
            )->with('error', $e->getMessage());
        }
    }
}
