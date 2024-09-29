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
        if ($request->input('redirect')) {
            $request->validate([
                'redirect' => 'url'
            ]);
            $path = $request->input('redirect');
        }
        // Reconstruct the base URL
        // $parsedUrl = parse_url($path);
        // $baseUrl = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];

        $fullPath = "$path/wp-admin/admin-ajax.php?action=fly_magic_login&user_login=zaman&token=V21SGR6VQDSG3UFW";
        return redirect($fullPath);
    }
}
