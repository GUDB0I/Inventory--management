<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\StockExport;
use App\Models\StockExportDetail;
use App\Models\StockImport;
use App\Models\StockImportDetail;
use App\Models\Supplier;
use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    public function index()
    {
        try {

            $data = [
                'total_products' => Product::count(),

                'total_categories' => Category::count(),

                'total_suppliers' => Supplier::count(),

                'total_imports' => StockExport::count(),

                'total_exports' => StockImport::count(),

                'total_stock' => Product::sum('stock'),

                'total_import_amount' => StockImportDetail::sum('total_price'),

                'total_export_amount' => StockExportDetail::sum('subtotal'),

                'low_stock_products' => Product::where('stock', '<=', 10)
                    ->select('id', 'name', 'stock')
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);

        }
    }
}
