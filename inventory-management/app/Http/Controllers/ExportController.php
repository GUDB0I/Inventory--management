<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExportRequest;
use App\Models\Product;
use App\Models\StockExport;
use App\Models\StockExportDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function index()
    {
        try {
            $export = StockExport::with('details', "user")->get();
            return response()->json([
                'success' => true,
                'data' => $export,
                'message' => 'Lấy thành công danh sách xuất kho'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Tạo danh sách exports
    public function store(ExportRequest $request)
    {
        $data = $request->validated();
        try {
            DB::transaction(function () use ($data) {
                // Tạo phiếu xuất kho
                $export = StockExport::create([
                    'user_id' => auth()->id(),
                    'export_date' =>  $data['export_date'],
                ]);
                // Xuát nhiều sản phẩm
                foreach ($data['products'] as $item) {
                    $prod = Product::findOrFail($item['product_id']);
                    if ($prod->stock >= $item['quantity']) {
                        StockExportDetail::create([
                            'stock_export_id' => $export->id,
                            'product_id' => $item['product_id'],
                            'quantity' => $item['quantity'],
                            'unit_price' => $prod->price,
                            'subtotal' => $prod->price * $item['quantity'],
                        ]);
                        // Update stock mới
                        $prod->decrement('stock', $item['quantity']);
                    } else {
                        return response()->json([
                            'success' => false,
                            'message' => "Không thể tạo",
                        ]);
                    }
                }
                return response()->json([
                    'success' => true,
                    'message' => "Xuất kho thành công",
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $export = StockExport::with('user', 'details', 'details.product')->findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $export,
                'message' => "Thành công",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Bộ lọc tìm kiếm
    public function filter(Request $request)
    {
        $query = StockExport::query();

        try {
            if ($request->filled('user_id')) {
                $query->where('user_id', $request->user_id);
            }
            if ($request->filled('start_date') && $request->filled('end_date')) {
                $query->whereBetween('export_date', [
                    $request->start_date,
                    $request->end_date
                ]);
            }
            $exports = $query->with([
                'user',
                'details.product'
            ])->get();
            return response()->json([
                'success' => true,
                'data' => $exports,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
