<?php

use App\Http\Controllers\Api\ApiCustomerCare;
use App\Http\Controllers\Api\ApiEcareController;
use App\Http\Controllers\Api\ApiEclaimController;
use App\Http\Controllers\Api\ApiHandlerController;
use App\Http\Controllers\Api\ApiTraceConnote;
use FontLib\Table\Type\name;
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
Route::prefix('apiservices')->name('apiservices.')->group(function () {
    Route::controller(ApiTraceConnote::class)->name('traceconnote.')->prefix('traceconnote')->group(function () {
        Route::post('/cek-hybrid', 'cek_on_hybrid_api')->name('cek-hybrid');
        Route::post('/detail-hybrid', 'cen_detail_on_hybrid_api')->name('detail-hybrid');
    });
});

Route::name('api.')->group(function () {
    Route::prefix('eclaim')->name('eclaim.')->group(function () {
        Route::get('/checkawb', [ApiEclaimController::class, 'checkEclaimAwb'])->name('checkawb');

        Route::get('/', [ApiEclaimController::class, 'index'])->name('index');
        Route::get('/openclaim', [ApiEclaimController::class, 'openclaim'])->name('openclaim');
        Route::get('/processed', [ApiEclaimController::class, 'processed'])->name('processed');
    });

    Route::prefix('ecare')->name('ecare.')->group(function () {
        Route::get('/tracking', [ApiEcareController::class, 'tracking'])->name('tracking');
        Route::get('/comments/{id}', [ApiEcareController::class, 'getComments'])->name('getcomments'); //ini dipake
    });
    Route::get('/tracking', [ApiEcareController::class, 'tracking'])->name('tracking');

    Route::get('apijneecaretrackingresi', [ApiHandlerController::class, 'trackingResi'])->name('trackingResi');
});
