<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class StockExportDetail extends Model
{
      protected $fillable = [
        'stock_export_id',
        'product_id',
        'quantity',
        'unit_price',
        'subtotal',
    ];

    public function stockExport(): BelongsTo
    {
        return $this->belongsTo(StockExport::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
