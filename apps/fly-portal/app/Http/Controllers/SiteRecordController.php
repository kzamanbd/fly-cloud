<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiteRecordRequest;
use App\Models\Site;
use Exception;
use Illuminate\Support\Facades\DB;

class SiteRecordController extends Controller
{
    public function index()
    {
        return inertia('SitesRecords', [
            'sites' => Site::query()->latest()->get(),
        ]);
    }

    public function store(SiteRecordRequest $request)
    {
        DB::beginTransaction();
        try {
            $site = Site::create($request->formData());

            if ($request->input('privateKey')) {
                $name = $site->name . ' Private Key' ?? 'Private Key' . $site->id;

                $site->keys()->create([
                    'name' => $name,
                    'private_key' => encrypt($request->input('privateKey')),
                    'public_key' => encrypt($request->input('publicKey'))
                ]);
            }
            DB::commit();

            return redirect()->route('sites.index')
                ->with('success', 'Site created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
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
        DB::beginTransaction();
        try {
            $site->update($request->formData());

            if ($request->input('privateKey')) {
                $name = $site->name . ' Private Key' ?? 'Private Key' . $site->id;

                $site->keys()->create([
                    'name' => $name,
                    'private_key' => encrypt($request->input('privateKey')),
                    'public_key' => encrypt($request->input('publicKey'))
                ]);
            }
            DB::commit();

            return redirect()->route('sites.index')
                ->with('success', 'Site successfully Updated.');
        } catch (Exception $e) {
            DB::rollBack();
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
