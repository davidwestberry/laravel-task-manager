<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Task;

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
Route::get('/tasks', function() {
    return Task::orderBy('due_date', 'desc')->get();
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
