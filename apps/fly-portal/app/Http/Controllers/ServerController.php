<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ServerController extends Controller
{
    public function index()
    {
        return Inertia::render('Servers/Dashboard');
    }

    public function create()
    {
        return inertia('Servers/Create');
    }
}
