<?php

use App\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
Route::put('/tasks/{id}', function (Request $request, $id) {
    Log::debug("Completing task with id " . $id);
    $task = Task::find($id);

    Log::debug("Found task to update " . $task->name);

    $task->update([
        'completed' => $request->completed,
        'completed_date' => $request->completed ? Carbon::now() : null
    ]);

    return Task::orderBy('due_date', 'desc')->get();
});

Route::post('/task', function (Request $request) {
    $task = new Task;
    $task->name = $request->name;
    $task->description = $request->description;
    $task->completed_date = null;
    $task->due_date = $request->due_date;
    $task->completed = $request->completed;

    $task->save();

    return $task->toJson();
})->name('newtask');

Route::get('/tasks', function () {
    return Task::orderBy('due_date', 'desc')->get();
});

Route::fallback(function (Request $request) {
    return "The requested resource " . $request->path() . " was not found.";
});
