<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function user()
    {
        return new UserResource(Auth::user());
    }

    public function changePassword()
    {
        return response()->json([
            "status" => true
        ]);
    }

    public function changeDetails(Request $request)
    {
//        dd($request->name);
        $user = User::findOrFail(Auth::id());
        $user->name = $request->name;
        $user->email = $request->email;
        if ($user->save()){
            return response()->json(["success" => true]);
        }
        return response()->json(["success" => false]);
    }
}
