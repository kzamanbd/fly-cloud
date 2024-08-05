<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiteRecordRequest;
use App\Models\Site;
use Exception;

class SiteRecordController extends Controller
{
    public function index()
    {
        return inertia('SitesRecords', [
            'sites' => Site::all(),
        ]);
    }

    public function store(SiteRecordRequest $request)
    {
        try {
            Site::create($request->formData());
            return redirect()->route('sites.index')
                ->with('success', 'Site created successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function show(Site $site)
    {
        $address = $site->path;
        $action = "/wp-admin/admin-ajax.php?action=fly_magic_login&user_login=zaman&token=V21SGR6VQDSG3UFW";
        return redirect($address . $action);
    }

    public function update(SiteRecordRequest $request, Site $site)
    {
        try {
            $site->update($request->formData());
            return redirect()->route('sites.index')
                ->with('success', 'Site updated successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            Site::destroy($id);
            return redirect()->route('sites.index')
                ->with('success', 'Site deleted successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
