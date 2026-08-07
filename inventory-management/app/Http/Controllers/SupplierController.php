<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // Lấy danh sách
    public function index(){
       try{
         $supp = Supplier::latest()->get();
         return response()->json([
        'success'=> true,
        'data'=> $supp,
        'message'=>"Lấy thành công danh sách nhà cung cấp"
         ],200);
       }catch(\Exception $e){
         return response()->json([
        'success'=> false,
        'message'=>$e->getMessage()
         ],500);
       }
    }

    // Thêm nhà cung cấp
    public function store(SupplierRequest $request){
        try{
        $supp = Supplier::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'phone'=>$request->phone,
        'address'=>$request->address,
         ]);
         return response()->json([
        'success'=> true,
        'data'=> $supp,
        'message'=>"Thêm nhà cung cấp thành công"
         ],201);
       }catch(\Exception $e){
         return response()->json([
        'success'=> false,
        'message'=>$e->getMessage()
         ],500);
       }
    }

     // Chi tiết nhà cung cấp
    public function show(string $id){
    try{
       $supp = Supplier::findOrFail($id);
         return response()->json([
            'success'=> true,
            'data'=> $supp,
            'message'=> "Lấy chi tiết thông tin của nhà cung cấp thành công"
        ],200);
    }catch(\Exception $e){
             return response()->json([
            'success'=> false,
            'message'=> $e->getMessage()
        ],500);
        }
    }

    // Sửa thông tin nhà cung cấp
    public function update(SupplierRequest $request, string $id){
    try{
        $supp = Supplier::findOrFail($id);
        $supp->update([
        'name'=>$request->name,
        'email'=>$request->email,
        'phone'=>$request->phone,
        'address'=>$request->address, 
        ]);
        return response()->json([
        'success'=> true,
        'data'=> $supp,
        'message'=>"Sửa thành công danh sách nhà cung cấp"
         ],200);
    }catch(\Exception $e){
         return response()->json([
        'success'=> false,
        'message'=>$e->getMessage()
         ],500);
       }
    }

    // Xóa thông tin nhà cung cấp
    public function destroy(string $id){
        try{
            $supp = Supplier::findOrFail($id);
            $supp->delete();
             return response()->json([
            'success'=> true,
            'message'=> "Xóa nhà cung cấp thành công"
        ],200); 
        }catch(\Exception $e){
            return response()->json([
            'success'=> false,
            'message'=> $e->getMessage()
        ],500);
        }
    }
}
