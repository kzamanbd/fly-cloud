<?php

/*
Plugin Name: Fly Magic Login
Description: A plugin to handle magic login from the WP Management Portal. Requires a token to be passed in the query string. and user_login to be passed in the query string.
Version: 1.0
Author: Kamruzzaman
*/

// Include the plugin.php file to use the is_plugin_active function
include_once(ABSPATH . 'wp-admin/includes/plugin.php');

function fly_magic_login()
{
    // check if plugin is active or not 
    if (!is_plugin_active('fly-magic-login/fly-magic-login.php')) {
        wp_die('Plugin is not active');
    }

    if (is_user_logged_in()) {
        wp_redirect(admin_url());
        exit();
    } else {
        $authToken = 'V21SGR6VQDSG3UFW';
        // Get the user_login from the query string 
        $user_login = $_GET['user_login'];
        $token = $_GET['token'];
        // check token is valid or not
        if (!isset($token) && $token != $authToken) {
            wp_die('Invalid Token');
        }
        // Get the user by user_login
        $user = get_user_by('login', $user_login);
        // If user not found then die with message
        if (!$user) {
            wp_die('User not found');
        }

        // Set the auth cookie for the user and redirect to admin
        $user_id = $user->ID;
        wp_set_auth_cookie($user_id);
        wp_redirect(admin_url());
        exit();
    }
}

add_action('wp_ajax_nopriv_fly_magic_login', 'fly_magic_login');
add_action('wp_ajax_fly_magic_login', 'fly_magic_login');
