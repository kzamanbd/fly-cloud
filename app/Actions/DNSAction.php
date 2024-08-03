<?php

namespace App\Actions;

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
        $this->apiToken = env('CLOUDFLARE_API_DNS_TOKEN', 'TWza6Zcr2i9GYg1xlqPwzIRDR7ChxWVfVnTAPDbd');
    }

    public function getRecords($zoneId)
    {
        try {
            $response = $this->client->request('GET', "zones/{$zoneId}/dns_records", [
                'headers' => [
                    'Authorization' => "Bearer {$this->apiToken}",
                    'Content-Type' => 'application/json',
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            return [
                'result' => [],
                'error' => $e->getMessage(),
            ];
        }
    }

    public function createRecord($zoneId, $type, $name, $content)
    {
        try {
            $response = $this->client->request('POST', "zones/{$zoneId}/dns_records", [
                'headers' => [
                    'Authorization' => "Bearer {$this->apiToken}",
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'type' => $type,
                    'name' => $name,
                    'content' => $content,
                    'ttl' => 120,
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            return [
                'result' => [],
                'error' => $e->getMessage(),
            ];
        }
    }

    public function getZones()
    {
        try {
            $response = $this->client->request('GET', 'zones', [
                'headers' => [
                    'Authorization' => "Bearer {$this->apiToken}",
                    'Content-Type' => 'application/json',
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return [
                'result' => [],
                'error' => $e->getMessage(),
            ];
        }
    }
}
