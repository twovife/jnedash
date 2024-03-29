<?php

use App\Http\Controllers\ClaimController;
use App\Http\Controllers\ComplainController;
use App\Http\Controllers\ComplainRequestController;
use App\Http\Controllers\CustomerClaimController;
use App\Http\Controllers\CustomerServiceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TraceCnoteController;
use App\Models\Claim;
use App\Models\ComplainRequest;
use Barryvdh\DomPDF\PDF;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
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

Route::get('/', function () {
  return redirect()->route('login');
});

// Route::get('/email', function () {

//     $pdf = App::make('dompdf.wrapper');
//     $pdf->setOption(['isPhpEnabled' => true, 'dpi' => 150, 'isHtml5ParserEnabled' => true])->setPaper('a4');
//     $pdf->loadView('exportpdf.testpdf');
//     $pdfPath = storage_path('app/public' . 'test.pdf');
//     $pdf->save($pdfPath);

//     Mail::send('exportpdf.testpdf', ['data' => 'asd'], function ($message) use ($pdfPath) {
//         $message->to('azizihsan69@gmail.com')
//             ->subject('Subject')
//             ->attach($pdfPath);
//     });

//     // Delay for a moment to ensure the email is sent before file deletion
//     sleep(2);

//     // Delete the PDF file after the email is sent (optional)
//     unlink($pdfPath);
// });
// Route::get('/', [DashboardController::class, 'index']);


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');

Route::controller(CustomerServiceController::class)->prefix('customer-service')->name('cs.')->group(function () {
  Route::get('/', 'index')->name('index');
  Route::get('/detail-request/{no_request}', 'detailRequest')->name('detailRequest');
  Route::prefix('internal')->group(function () {
    Route::get('/', 'internalIndex')->name('internal');
    Route::post('/', 'internalStore')->name('internalStore');
  });
});

Route::prefix('csoffice')->name('csoffice.')->group(function () {
  Route::controller(ComplainRequestController::class)->name('complainrequest.')->prefix('complainrequest')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/generate/{complainRequest}', 'generate')->name('generate');
    Route::post('/generate/{complainRequest}', 'generatestore')->name('generatestore');
  });
  Route::controller(ComplainController::class)->name('complain.')->prefix('complain')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::post('/complain/{complain}/storecomment', 'storecomment')->name('storecomment');
    Route::get('/edit/{complain}', 'edit')->name('edit');
    Route::put('/update/{complain}', 'update')->name('update');
    Route::delete('/delete/{complain}', 'destroy')->name('destroy');
  });
  Route::controller(ClaimController::class)->name('claim.')->prefix('claim')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::put('/proccess/{claim}', 'proccessdata')->name('proccessdata');
    Route::post('/approved/{claim}',  'approved')->name('approved');
    Route::put('/rejected/{claim}',  'rejected')->name('rejected');
    Route::get('/show/{claim}',  'show')->name('show');
    Route::get('/monitoring', 'monitoring')->name('monitoring');
    // Route::get('/exportExcell',  'exportExcell')->name('exportExcell');
  });
})->middleware(['auth']);

Route::prefix('eclaim')->name('eclaim.')->group(function () { //done
  Route::get('/{signature}/signature', [ClaimController::class, 'signature'])->name('signature');
  Route::get('/{ticket_id}/exportpdf', [ClaimController::class, 'exportpdf'])->name('exportpdf');
  Route::get('/{ticket_id}/clientpdf', [ClaimController::class, 'clientpdf'])->name('clientpdf');
  Route::post('/', [ClaimController::class, 'store'])->name('store');
});

Route::prefix('claim')->name('claim.')->group(function () { //done
  Route::get('/', [ClaimController::class, 'customer'])->name('customer');
  Route::get('/{ticket_id}/customerthanks', [ClaimController::class, 'customerthanks'])->name('customerthanks');
});



Route::prefix('email')->name('email.')->group(function () {
  Route::get('/createclaim/{ticket_id}', [EmailController::class, 'createclaim'])->name('createclaim');
});


Route::middleware(['auth'])->group(function () {
  Route::prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
  });
});




require __DIR__ . '/auth.php';
