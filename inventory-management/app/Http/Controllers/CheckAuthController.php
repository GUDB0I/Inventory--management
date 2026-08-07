<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class CheckAuthController extends Controller
{
    public function postLogin(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Sai tài khoản hoặc mật khẩu'
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ]);
    }

    // Register
    public function postRegister(RegisterRequest $request) {
        $user = User::create([
        'name'=> $request->name,
        'email'=>$request->email,
        'password'=>Hash::make($request->password)
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'success'=>true,
             'data'=> $user,  
             'token'=>$token 
        ],);
    }

    // Logout
    public function postLogout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successfully'
        ]);
    }

     public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }
}