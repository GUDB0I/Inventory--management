<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImportRequest;
use App\Models\Product;
use App\Models\StockExportDetail;
use App\Models\StockImport;
use App\Models\StockImportDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public function index()
    {
        try {
            $import = StockImport::with("supplier","user")->get();
            return response()->json([
                'success' => true,
                'data' => $import,
                'message' => "Lấy danh sách thành công"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(ImportRequest $request)
    {
        $data = $request->validated();
        try {
            DB::transaction(function () use ($data) {
                // 1. Tạo phiếu nhập
                $stockImport = StockImport::create([
                    'supplier_id' => $data['supplier_id'],
                    'user_id' => auth()->id(),
                    'import_date' =>  $data['import_date'],
                ]);
                // 2. foreach tạo chi tiết
                foreach ($data['products'] as $item) {
                    $import = StockImportDetail::create([
                        'stock_import_id' => $stockImport->id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'total_price' => $item['quantity'] * $item['unit_price'],
                    ]);

                    // 3. Update kho
                    $product = Product::findOrFail($item['product_id']);

                    $product->stock += $item['quantity'];

                    $product->save();
                }
            });

            return response()->json([
                'success' => true,
                'message' => "Nhập đơn hàng thành công",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Tìm kiếm đơn bằng bộ lọc
    public function filter(Request $request)
    {
        $query = StockImport::query();
        try {
            if ($request->filled('supplier_id')) {
                $query->where('supplier_id', $request->supplier_id);
            }
            if ($request->start_date && $request->end_date) {
                $query->whereBetween('import_date', [
                    $request->start_date,
                    $request->end_date
                ]);
            }
            $stockImport = $query->with("supplier","user")->get();
            return response()->json([
                'success' => true,
                'data' => $stockImport,
                'message' => 'Tìm kiếm cho ra kết quả'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Chi tiết đơn nhập
    public function show(string $id){
    try{
        $stockimport = StockImport::with('details','user','supplier','details.product')->findOrFail($id);
        return response()->json([
                'success' => true,
                'data' => $stockimport,
                'message' => 'Tìm kiếm cho ra kết quả'
            ], 200);
    }catch(\Exception $e){
         return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
    }
    }
}
