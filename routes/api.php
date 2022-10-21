<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Route::middleware('auth:api')->get('/me', function (Request $request) {
//    return $request->user();
//});

Route::middleware('auth:api')->group(function (){
    Route::get('/me', [UsersController::class, 'user'])->name('api.me');
    Route::post('/change-password', [UsersController::class, 'changePassword'])->name('api.change-password');
    Route::post('/change-details', [UsersController::class, 'changeDetails'])->name('api.change-details');
});

Route::post('login', [AuthController::class, 'login'])->name('api.login');
Route::post('register', [AuthController::class, 'register'])->name('api.register');

Route::post('forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('api.forgot-password');
Route::post('reset-password', [ResetPasswordController::class, 'reset'])->name('api.reset-password');
