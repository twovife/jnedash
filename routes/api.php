<?php

use App\Http\Controllers\Api\ApiEclaimController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::name('api.')->group(function () {
    Route::prefix('eclaim')->name('eclaim.')->group(function () {
        Route::get('/checkawb', [ApiEclaimController::class, 'checkEclaimAwb'])->name('checkawb');
        Route::get('/', [ApiEclaimController::class, 'index'])->name('index');
        Route::get('/openclaim', [ApiEclaimController::class, 'openclaim'])->name('openclaim');
        Route::get('/processed', [ApiEclaimController::class, 'processed'])->name('processed');
    });
});
