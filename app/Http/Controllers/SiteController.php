<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        return inertia('SitesRecords', [
            'sites' => Site::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'path' => 'required|string',
        ]);

        Site::create($validated);

        return redirect()->route('sites.index');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'path' => 'required|string',
        ]);

        $site = Site::findOrFail($id);
        $site->update($validated);

        return redirect()->route('sites.index');
    }

    public function destroy($id)
    {
        $site = Site::findOrFail($id);
        $site->delete();

        return redirect()->route('sites.index');
    }
}
