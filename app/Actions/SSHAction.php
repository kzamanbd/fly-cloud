<?php

namespace App\Actions;

use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Net\SSH2;
use Serializable;

class SSHAction implements Serializable
{
    protected $ssh;
    protected $isConnected = false;
    protected $host;
    protected $port;
    protected $username;
    protected $password;
    protected $privateKeyPath;

    public function __construct()
    {
        //
    }

    public function serialize()
    {
        return serialize([
            'isConnected' => $this->isConnected,
            'host' => $this->host,
            'port' => $this->port,
            'username' => $this->username,
            'password' => $this->password,
            'privateKeyPath' => $this->privateKeyPath,
        ]);
    }

    public function unserialize($data)
    {
        $data = unserialize($data);
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

    public function connectWithPassword($host, $port, $username, $password)
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
        return $this->ssh;
    }

    public function connectWithKey($host, $port, $username, $privateKeyPath)
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

    public function execute($command)
    {
        if (!$this->isConnected) {
            throw new \Exception('Not connected to SSH');
        }
        $output = $this->ssh->exec($command);
        return mb_convert_encoding($output, 'UTF-8', 'UTF-8');
    }

    public function disconnect()
    {
        if ($this->isConnected) {
            $this->ssh->disconnect();
            $this->isConnected = false;
        }
    }
}
