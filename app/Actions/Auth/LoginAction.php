<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

class LoginAction
{
    public function run($request)
    {
        $user = User::where('email', $request['email'])->first(); //->where('email_verified_at', '<>', NULL)

        if (!$user) {
            return [
                "response" => 'Email is not verified',
                "content" => ''
            ];
        }

        $passwordGrantClient = Client::where('password_client', 1)->first();

        $data = [
            'grant_type' => 'password',
            'client_id' => $passwordGrantClient->id,
            'client_secret' => $passwordGrantClient->secret,
            'username' => $request['email'],
            'password' => $request['password'],
            'scope' => '*'
        ];

        $tokenRequest = Request::create('/oauth/token',  'post', $data);

        $tokenResponse = app()->handle($tokenRequest);
        $contentString = $tokenResponse->getContent();

        return [
            "verified" => $user['email_verified_at'],
            "response" => $tokenResponse,
            "content" => json_decode($contentString, true)
        ];
    }
}
