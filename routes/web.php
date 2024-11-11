<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QnaController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // qna
    Route::get('/qnas', [QnaController::class, 'index'])->name('qnas.index');
    Route::get('/qnas/create', [QnaController::class, 'create'])->name('qnas.create');
    Route::post('/qnas', [QnaController::class, 'store'])->name('qnas.store');
    Route::get('/qnas/{qna}', [QnaController::class, 'show'])->name('qnas.show');
    Route::get('/qnas/{qna}/edit', [QnaController::class, 'edit'])->name('qnas.edit');
    Route::put('/qnas/{qna}', [QnaController::class, 'update'])->name('qnas.update');
    Route::delete('/qnas/{qna}', [QnaController::class, 'destroy'])->name('qnas.destroy');
});

Route::resource('qnas', QnaController::class);

require __DIR__.'/auth.php';
