<?php

namespace App\Actions;

use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Net\SSH2;

class SSHAction
{

    protected $ssh;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


    public function connectWithPassword($host, $port, $username, $password)
    {
        $this->ssh = new SSH2($host, $port);

        if (!$this->ssh->login($username, $password)) {
            throw new \Exception('Login failed');
        }
    }

    public function connectWithKey($host, $port, $username, $privateKeyPath)
    {
        $this->ssh = new SSH2($host, $port);
        $key = PublicKeyLoader::loadPrivateKey(file_get_contents($privateKeyPath));

        if (!$this->ssh->login($username, $key)) {
            throw new \Exception('Login failed');
        }
    }

    public function execute($command)
    {
        return $this->ssh->exec($command);
    }
}
