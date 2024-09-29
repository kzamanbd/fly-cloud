<?php

namespace App\Actions;

use App\Events\SshOutputEvent;
use Illuminate\Support\Facades\Log;
use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Net\SSH2;

class SSHAction
{
    protected SSH2 $ssh;

    protected string $host;
    protected int $port;

    protected string $username;

    protected $password;
    protected $privateKeyPath;

    protected bool $isConnected = false;

    public function __construct()
    {
        //
    }

    /**
     * @return array
     */
    public function __serialize()
    {
        return [
            'isConnected' => $this->isConnected,
            'host' => $this->host,
            'port' => $this->port,
            'username' => $this->username,
            'password' => $this->password,
            'privateKeyPath' => $this->privateKeyPath,
        ];
    }

    public function __unserialize($data)
    {
        $this->isConnected = $data['isConnected'];
        $this->host = $data['host'];
        $this->port = $data['port'];
        $this->username = $data['username'];
        $this->password = $data['password'];
        $this->privateKeyPath = $data['privateKeyPath'];

        if ($this->isConnected) {
            $this->ssh = new SSH2($this->host, $this->port);
            if ($this->password) {
                $this->ssh->login($this->username, $this->password);
            } else {
                $key = PublicKeyLoader::loadPrivateKey(file_get_contents($this->privateKeyPath));
                $this->ssh->login($this->username, $key);
            }
        }
    }

    /**
     * @param $host
     * @param $port
     * @param $username
     * @param $password
     * @return SSH2
     * @throws \Exception
     */
    public function connectWithPassword($host, $port, $username, $password): SSH2
    {
        if (!$this->isConnected) {
            $this->ssh = new SSH2($host, $port);
            if (!$this->ssh->login($username, $password)) {
                throw new \Exception('Login Failed');
            }
            $this->host = $host;
            $this->port = $port;
            $this->username = $username;
            $this->password = $password;
            $this->isConnected = true;
        }
        Log::info('Connected to SSH', [$this->ssh]);
        return $this->ssh;
    }

    /**
     * @param $host
     * @param $port
     * @param $username
     * @param $privateKeyPath
     * @return SSH2
     * @throws \Exception
     */
    public function connectWithKey($host, $port, $username, $privateKeyPath): SSH2
    {
        if (!$this->isConnected) {
            $this->ssh = new SSH2($host, $port);
            $key = PublicKeyLoader::loadPrivateKey(file_get_contents($privateKeyPath));
            if (!$this->ssh->login($username, $key)) {
                throw new \Exception('Login Failed');
            }
            $this->host = $host;
            $this->port = $port;
            $this->username = $username;
            $this->privateKeyPath = $privateKeyPath;
            $this->isConnected = true;
        }
        return $this->ssh;
    }

    /**
     * @return SSH2
     */

    public function startInteractiveSession() : SSH2
    {
        $this->ssh->setTimeout(0);
        return $this->ssh;
    }


    /**
     * @throws \Exception
     */
    public function execute($command, $sessionId): bool|string
    {
        if (!$this->isConnected) {
            throw new \Exception('Not connected to SSH');
        }
        return $this->ssh->exec($command, function ($data) use ($sessionId) {
            broadcast(new SshOutputEvent($sessionId, $data));
        });
    }

    /**
     * @return void
     */
    public function disconnect(): void
    {
        if ($this->isConnected) {
            $this->ssh->disconnect();
            $this->isConnected = false;
        }
    }
}
