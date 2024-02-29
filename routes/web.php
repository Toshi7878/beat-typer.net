<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EditController;
use App\Http\Controllers\TypeController;

use App\Http\Controllers\PostMapController;
use App\Http\Controllers\GetMapController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/movie/edit/new', [EditController::class, 'newCreate']);
Route::get('/movie/type/{id}', TypeController::class);


Route::get('/edit/post', [PostMapController::class, 'create']);
Route::post('/edit/post', [PostMapController::class, 'create']);
Route::get('/map/get/{id}', [GetMapController::class, 'store']);
