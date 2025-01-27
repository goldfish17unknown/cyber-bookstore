<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');


Route::post('user/register',[AuthController::class, 'register']);
Route::post('user/login',[AuthController::class, 'login']);

Route::post('user/getuser',[AuthController::class, 'getCurrentUser'])->middleware('auth:api');