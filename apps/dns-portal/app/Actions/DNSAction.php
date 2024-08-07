<?php

namespace App\Actions;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class DNSAction
{
    protected $client;
    protected $apiToken;

    /**
     * Create a new class instance.
     */

    public function __construct()
    {
        $this->client = new Client(['base_uri' => 'https://api.cloudflare.com/client/v4/']);
        $this->apiToken = env('CLOUDFLARE_DNS_TOKEN');
    }

    public function getRecords($zoneId)
    {
        $response = $this->client->request('GET', "zones/{$zoneId}/dns_records", [
            'headers' => [
                'Authorization' => "Bearer {$this->apiToken}",
                'Content-Type' => 'application/json',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function createRecord($zoneId, $data)
    {
        $response = $this->client->request('POST', "zones/{$zoneId}/dns_records", [
            'headers' => [
                'Authorization' => "Bearer {$this->apiToken}",
                'Content-Type' => 'application/json',
            ],
            'json' => $data
        ]);

        return json_decode($response->getBody(), true);
    }

    public function updateRecord($zoneId, $recordId, $data)
    {
        $response = $this->client->request('PUT', "zones/{$zoneId}/dns_records/{$recordId}", [
            'headers' => [
                'Authorization' => "Bearer {$this->apiToken}",
                'Content-Type' => 'application/json',
            ],
            'json' => $data,
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getZones()
    {
        $response = $this->client->request('GET', 'zones', [
            'headers' => [
                'Authorization' => "Bearer {$this->apiToken}",
                'Content-Type' => 'application/json',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }
}
