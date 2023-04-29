<?php

use App\Http\Controllers\ClaimController;
use App\Http\Controllers\ComplainController;
use App\Http\Controllers\ComplainRequestController;
use App\Http\Controllers\CustomerClaimController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TraceCnoteController;
use App\Models\Claim;
use App\Models\ComplainRequest;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return redirect()->to('https://www.jne.co.id/id/beranda');
// });

Route::get('/', [DashboardController::class, 'index']);


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::prefix('eclaim')->name('eclaim.')->middleware('permission:cs')->group(function () {
        Route::get('/', [ClaimController::class, 'index'])->name('index');
        Route::get('/create', [ClaimController::class, 'create'])->name('create'); //done
        Route::get('/open', [ClaimController::class, 'open'])->name('open'); //done
        Route::get('/processed', [ClaimController::class, 'processed'])->name('processed');
        Route::get('/monitoring', [ClaimController::class, 'monitoring'])->name('monitoring');
        Route::get('/exportExcell', [ClaimController::class, 'exportExcell'])->name('exportExcell');
        Route::get('/closed', [ClaimController::class, 'closed'])->name('closed');
        Route::put('/{claim}', [ClaimController::class, 'update'])->name('update');
        Route::put('/{claim}/proccess', [ClaimController::class, 'proccessdata'])->name('processdata');
        Route::post('/{claim}/approved', [ClaimController::class, 'approved'])->name('approved');
        Route::put('/{claim}/rejected', [ClaimController::class, 'rejected'])->name('rejected');
        Route::get('/{claim}', [ClaimController::class, 'show'])->name('show');
    });


    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

Route::prefix('email')->name('email.')->group(function () {
    Route::get('/createclaim/{ticket_id}', [EmailController::class, 'createclaim'])->name('createclaim');
});

Route::prefix('eclaim')->name('eclaim.')->group(function () { //done
    Route::get('/{ticket_id}/signature', [ClaimController::class, 'signature'])->name('signature');
    Route::get('/{ticket_id}/exportpdf', [ClaimController::class, 'exportpdf'])->name('exportpdf');
    Route::get('/{ticket_id}/clientpdf', [ClaimController::class, 'clientpdf'])->name('clientpdf');
    Route::post('/', [ClaimController::class, 'store'])->name('store');
});

Route::prefix('claim')->name('claim.')->group(function () { //done
    Route::get('/', [ClaimController::class, 'customer'])->name('customer');
    Route::get('/{ticket_id}/customerthanks', [ClaimController::class, 'customerthanks'])->name('customerthanks');
});

Route::get('/', [ComplainRequestController::class, 'customer'])->name('customepage');
Route::get('/test', [ComplainRequestController::class, 'test'])->name('test');
Route::post('/', [ComplainRequestController::class, 'customerStore'])->name('customerStore');


Route::prefix('ecare')->name('ecare.')->group(function () {
    Route::prefix('trace')->name('trace.')->group(function () {
        Route::get('/', [TraceCnoteController::class, 'index'])->name('index');
    });
    Route::get('/', [ComplainController::class, 'index'])->name('index');
    Route::get('/request-complain', [ComplainRequestController::class, 'requestComplain'])->name('requestComplain');
    Route::get('/generate', [ComplainController::class, 'generate'])->name('generate');
    Route::get('/create', [ComplainController::class, 'create'])->name('create');
    Route::post('/', [ComplainController::class, 'store'])->name('store');
    Route::post('/comment', [ComplainController::class, 'commentstore'])->name('commentstore');
});


Route::get('/jsons', function () {
    $content = json_decode(file_get_contents(storage_path('app\public\zoning.json')), true);
    collect($content)->each(function ($contentt) {
        dd($contentt);
    });
    dd($content);
});

require __DIR__ . '/auth.php';
