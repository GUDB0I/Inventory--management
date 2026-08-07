<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class Categoties extends Controller
{
    public function index(){
        try{
            $category = Category::latest()->get();
        return response()->json([
            'success'=> true,
            'data'=> $category,
            'message'=> "Lấy thành công danh sách"
        ],200);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> $e->getMessage()
            ]);
        }
    }

    public function store(Request $request){
        try{
        $category = Category::create([
            'name'=> $request->name,
        ]);
        return response()->json([
            'success'=> true,
            'data'=> $category,
            'message'=> "Tạo danh mục thành công"
        ],201);
        }catch(\Exception $e){
        return response()->json([
            'success'=> false,
            'message'=> $e->getMessage()
        ],500);
    }
    }

    // Chi tiết danh mục
    public function show(string $id){
    try{
        $category = Category::findOrFail($id);
         return response()->json([
            'success'=> true,
            'data'=> $category,
            'message'=> "Lấy chi tiết danh mục thành công"
        ],200);
    }catch(\Exception $e){
             return response()->json([
            'success'=> false,
            'message'=> $e->getMessage()
        ],500);
        }
    }

    // Cập nhật danh mục
    public function update(Request $request, string $id){
        try{
            $category = Category::findOrFail($id);
            $category->update([
            'name'=>$request->name,
        ]);
        return response()->json([
            'success'=> true,
            'data'=> $category,
            'message'=> "Cập nhật danh mục thành công"
        ],200); 
        }catch(\Exception $e){
             return response()->json([
            'success'=> false,
            'message'=> $e->getMessage()
        ],500);
        }
    }

    public function destroy(string $id){
        try{
            $category = Category::findOrFail($id);
            $category->delete();
             return response()->json([
            'success'=> true,
            'message'=> "Xóa danh mục thành công"
        ],200); 
        }catch(\Exception $e){
            return response()->json([
            'success'=> false,
            'message'=> $e->getMessage()
        ],500);
        }
    }
}
