<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'supplier_id',
        'name',
        'price',
        'stock',
        'description',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function stockImportDetails(): HasMany
    {
        return $this->hasMany(StockImportDetail::class);
    }

    public function stockExportDetails(): HasMany
    {
        return $this->hasMany(StockExportDetail::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
