<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{


    public function register(RegisterRequest $request){
        try{
            DB::beginTransaction();
            $data =  $request->validated();
            $user = User::create([
                'name' => $data["name"],
                'username' => $data["username"],
                'email' => $data["email"],
                'password' => Hash::make($data["password"])
            ]);
            $token = $user->createToken('authToken')->accessToken;
            DB::commit();
            return response() ->json([
                'user' => $user,
                "access_token" => $token
            ], 201);
        } catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 400);
        } 
    }


    public function login(Request $register){
        $data = $register->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        if(!Auth::attempt($data)){
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        $token = Auth::user()->createToken('authToken')->accessToken; 
        return response()->json([
            'user' => Auth::user(),
            'access_token' => $token
        ], 200);
    }


    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out']);
    }
    public function getCurrentUser(Request $request){
        $user = $request->user();
        return response()->json([
            'user' => $user
        ], 200);
    }

    
}
