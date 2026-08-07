<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    //Lấy danh sách sản phẩm
    public function index()
    {
        try {
            $product = Product::with('category', 'supplier', 'images')->get();
            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => "Lấy thành công sản phẩm"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Tạo sản phẩm 
    public function store(Request $request)
    {
        try {

            $product = Product::create([
                'category_id' => $request->category_id,
                'supplier_id' => $request->supplier_id,
                'name' => $request->name,
                'price' => $request->price,
                'stock' => 0,
                'description' => $request->description,
            ]);

            if ($request->hasFile('images')) {

                foreach ($request->file('images') as $image) {

                    $path = $image->store('images', 'public');

                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $product->load('images'),
                'message' => 'Thêm thành công sản phẩm'
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Chi tiết sản phẩm
    public function show(string $id)
    {
        try {
            $product = Product::with('category', 'supplier', 'images')->findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => "Lấy chi tiết sản phẩm thành công"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Update sản phẩm
    public function update(ProductCreateRequest $request, string $id)
    {
        try {

            $product = Product::findOrFail($id);

            $product->update([
                'category_id' => $request->category_id,
                'supplier_id' => $request->supplier_id,
                'name' => $request->name,
                'price' => $request->price,
                'description' => $request->description,
            ]);

            if ($request->hasFile('images')) {

                // Xóa toàn bộ ảnh cũ
                foreach ($product->images as $image) {

                    if (Storage::disk('public')->exists($image->image_path)) {
                        Storage::disk('public')->delete($image->image_path);
                    }

                    $image->delete();
                }

                // Thêm ảnh mới
                foreach ($request->file('images') as $file) {

                    $path = $file->store('images', 'public');

                    $product->images()->create([
                        'image_path' => $path,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $product->load('images'),
                'message' => 'Cập nhật thành công sản phẩm'
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {

            $product = Product::with('images')->findOrFail($id);

            foreach ($product->images as $image) {

                if (Storage::disk('public')->exists($image->image_path)) {
                    Storage::disk('public')->delete($image->image_path);
                }

                $image->delete();
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa thành công sản phẩm'
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // search filter 
    public function searchfilter(Request $request)
    {
        try {
            $query = $query = Product::with([
                'category',
                'supplier'
            ]);

            if ($request->filled('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            if ($request->filled('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->filled('supplier_id')) {
                $query->where('supplier_id', $request->supplier_id);
            }

            $product = $query->latest()->get();

            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => "Thành công"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Thất bại"
            ], 500);
        }
    }
}
