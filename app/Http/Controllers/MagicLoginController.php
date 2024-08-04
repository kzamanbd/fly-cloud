<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MagicLoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $path = 'http://wordpress.test';
        if ($request->input('path')) {
            $request->validate([
                'path' => 'url'
            ]);
            $path = $request->input('path');
        }
        $fullPath = "$path/wp-admin/admin-ajax.php?action=fly_magic_login&user_login=zaman&token=V21SGR6VQDSG3UFW";
        return response()->json(['url' => $fullPath]);
    }
}
