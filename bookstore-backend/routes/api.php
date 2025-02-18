<?php

use App\Service\BookService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BorrowedBookController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');


// ------------ front user view

Route::get('authors/front/limit', [AuthorController::class, 'getAuthorSlideShow']);







//------------------------------


// -----------  Admin view
Route::middleware([AdminMiddleware::class])->group(function() {

});
//* Authors tab
Route::get('authors', [AuthorController::class, 'index']);
Route::post('authors', [AuthorController::class, 'store']);


//-----------------------



Route::post('user/register',[AuthController::class, 'register']);



Route::post('categories', [CategoryController::class, 'store']);
Route::put('categories/{id}', [CategoryController::class, 'update']);
Route::delete('categories/{id}', [CategoryController::class, 'destroy']);


// Author routes



Route::put('authors/{id}', [AuthorController::class, 'update']);
Route::delete('authors/{id}', [AuthorController::class, 'destroy']);
Route::get('authors/{id}/books', [AuthorController::class, 'getBooksByAuthors']);


//Book routes



Route::get('books/{id}/author', [BookController::class, 'getBookAuthor']);
//TODO::To add borrowed history
Route::get('categories/{id}/books', [BookController::class, 'showBooksByCategory']);
Route::put('books/{id}', [BookController::class, 'update']);




Route::get('books/withStatus', [BookController::class, 'bookWithPaginateHome']);
Route::get('books/admin/withStatus', [BookController::class, 'bookWithPaginate']); 





// *********
// * For admin
// *********
// Route::get('login')
Route::post('admin/login',[AuthController::class, 'login']);
Route::middleware([AdminMiddleware::class])->group(function() {
    Route::post('admin/logout', [AuthController::class, 'logout']);
    Route::post('admin/info',[AuthController::class, 'getCurrentUser']);
    // * books management
    Route::get('books', [BookController::class, 'index']);  //pagination 6
    Route::post('books', [BookController::class, 'store']);
    
    Route::delete('books/{id}', [BookController::class, 'destroy']);

});



Route::get('authors/{id}', [AuthorController::class, 'show']);
    Route::get('books/{id}', [BookController::class, 'show']);


// * authors management




// * categories management
Route::get('categories', [CategoryController::class, 'index']);  // also uses in admin panel, book create dropdown





// * books





//* users
Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::delete('users/{id}', [UserController::class, 'destroy']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::get('users/borrowhistory/{id}', [UserController::class, 'userBorrowHistory']);

//* borrow books
Route::get('borrow', [BorrowedBookController::class, 'borrowedList']);
Route::post('borrow', [BorrowedBookController::class, 'store']);
Route::delete('borrow/{id}', [BorrowedBookController::class, 'deleteRecord']);
Route::put('borrow/return/{id}', [BorrowedBookController::class, 'returnBook']);



















