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
            'path' => 'required|url',
        ]);

        Site::create($validated);

        return redirect()->route('sites.index')->with('success', 'Site created successfully.');
    }

    public function show(Site $site)
    {
        $address = $site->path;
        $action = "/wp-admin/admin-ajax.php?action=fly_magic_login&user_login=zaman&token=V21SGR6VQDSG3UFW";
        return redirect($address . $action);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'path' => 'required|url',
        ]);

        $site = Site::findOrFail($id);
        $site->update($validated);

        return redirect()->route('sites.index')->with('success', 'Site updated successfully.');
    }

    public function destroy($id)
    {
        $site = Site::findOrFail($id);
        $site->delete();

        return redirect()->route('sites.index')->with('success', 'Site deleted successfully.');
    }
}
