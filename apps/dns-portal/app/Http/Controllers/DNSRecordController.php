<?php

namespace App\Http\Controllers;

use App\Actions\DNSAction;
use App\Http\Requests\DNSRecordRequest;
use Exception;

class DNSRecordController extends Controller
{

    public function __construct(protected DNSAction $dnsAction)
    {
        //
    }

    public function index()
    {
        try {
            $zones = $this->dnsAction->getZones();
            return inertia('DNSRecords', [
                'zones' => $zones['result'],
            ]);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getDNSRecords($zoneId)
    {
        $records = $this->dnsAction->getRecords($zoneId);
        return response()->json($records);
    }

    public function store(DNSRecordRequest $request, $zoneId)
    {
        try {

            $this->dnsAction->createRecord($zoneId, $request->formData());

            return redirect()->route('dns.index', [
                'zoneId' => $zoneId
            ])->with('success', 'Record created successfully');
        } catch (Exception $e) {
            return redirect()->route('dns.index', [
                'zoneId' => $zoneId
            ])->with('error', $e->getMessage());
        }
    }

    public function update(DNSRecordRequest $request, $zoneId, $recordId)
    {
        try {
            $this->dnsAction->updateRecord($zoneId, $recordId, $request->formData());

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
