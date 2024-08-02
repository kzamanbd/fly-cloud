<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SshOutput implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sessionId;
    public $output;

    public function __construct($sessionId, $output)
    {
        $this->sessionId = $sessionId;
        $this->output = mb_convert_encoding($output, 'UTF-8', 'UTF-8');
        Log::info('Broadcasting SSH output', ['sessionId' => $sessionId, 'output' => $output]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('ssh-room-' . $this->sessionId),
        ];
    }

    public function broadcastWith()
    {
        return ['output' => $this->output];
    }
}
