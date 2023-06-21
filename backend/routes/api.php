<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TipeController;
use App\Http\Controllers\API\StatusController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/posts/{id}/edit', [PostController::class, 'show_edit']);
Route::post('/posts', [PostController::class, 'store']);
Route::match(['PUT', 'POST'], '/posts/{id}', [PostController::class, 'update']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);
Route::apiResource('categories', CategoryController::class);
Route::get('/category/tipe/{tipe_id}', [CategoryController::class, 'tampil_tipe']);
Route::get('/headline/{id}', [PostController::class, 'headline']);
Route::get('/archived', [PostController::class, 'archived']);
Route::get('/draft', [PostController::class, 'draft']);
Route::get('/publish', [PostController::class, 'publish']);
Route::get('/search/{keyword}', [PostController::class, 'search']);
Route::get('/search/{keyword}/{category_id}', [PostController::class, 'search_category']);
Route::get('/tipe', [TipeController::class, 'index']);
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::put('update/{id}', 'update');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::get('user', [AuthController::class, 'users'])->middleware('auth:api');
