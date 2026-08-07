<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        try{
            $user = User::all();
            return response()->json([
            'succes'=> true,
            'data'=> $user,
            'message'=> "Lấy danh sách người dùng",
            ]);
        }catch(\Exception $e){
            return response()->json([
            'succes'=> false,
            'message'=> $e->getMessage(),
            ]);
        }
    }
}
