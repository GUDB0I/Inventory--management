<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckAuthController;
use App\Http\Controllers\Categoties;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;

// Auth Route
Route::prefix('authentication')
->controller(CheckAuthController::class)
->name('')
->group(function(){
    Route::post('/login','postLogin')->name('login');
    Route::post('/logout','postLogout')->name('logout');
    Route::post('/register','postRegister')->name('register');
    Route::get('/me','me')->name('me');
});

// Category Route
Route::middleware('auth:sanctum')
->prefix('category')
->controller(Categoties::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
    Route::post('/store','store')->name('store');
    Route::get('/show/{id}','show')->name('show');
    Route::put('/update/{id}','update')->name('update');
    Route::delete('/destroy/{id}','destroy')->name('destroy');
});

// Product Route
Route::middleware('auth:sanctum')
->prefix('product')
->controller(ProductController::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
    Route::post('/store','store')->name('store');
    Route::get('/show/{id}','show')->name('show');
    Route::put('/update/{id}','update')->name('update');
    Route::delete('/destroy/{id}','destroy')->name('destroy');
    Route::get('/searchfilter','searchfilter')->name('searchfilter');
});

// Supplier Route
Route::middleware('auth:sanctum')
->prefix('supplier')
->controller(SupplierController::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
    Route::post('/store','store')->name('store');
    Route::get('/show/{id}','show')->name('show');
    Route::put('/update/{id}','update')->name('update');
    Route::delete('/destroy/{id}','destroy')->name('destroy');
});

// stockimport Route
Route::middleware('auth:sanctum')
->prefix('stockimport')
->controller(ImportController::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
    Route::post('/store','store')->name('store');
    Route::get('/filter','filter')->name('filter');
    Route::get('/show/{id}','show')->name('show');
});

// stockexport Route
Route::middleware('auth:sanctum')->prefix('stockexport')
->controller(ExportController::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
    Route::post('/store','store')->name('store');
    Route::get('/filter','filter')->name('filter');
    Route::get('/show/{id}','show')->name('show');
});

Route::middleware('auth:sanctum')->prefix('dashboard')
->controller(DashBoardController::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
});

Route::middleware('auth:sanctum')->prefix('user')
->controller(UserController::class)
->name('')
->group(function(){
    Route::get('/index','index')->name('index');
});
