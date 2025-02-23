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
Route::get('books/front/limit', [BookController::class, 'index']);
Route::get('authors/dropdown/limit', [AuthorController::class, 'getAuthorLimit']);

//------------------------------

//-------------  Common 

//* get author by id
Route::get('authors/{id}', [AuthorController::class, 'show']);

//* categories
Route::get('categories', [CategoryController::class, 'index']);


// -------------------------






// -----------  Admin view
Route::post('admin/login',[AuthController::class, 'login']);

Route::middleware([AdminMiddleware::class])->group(function() {
    Route::post('admin/logout', [AuthController::class, 'logout']);

    // * categories tab
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);


});

//* category tab









//* Authors tab
Route::get('authors', [AuthorController::class, 'index']);
Route::post('authors', [AuthorController::class, 'store']);

//* book tab
Route::post('books', [BookController::class, 'store']);
Route::get('books', [BookController::class, 'index']); 



//-----------------------



Route::post('user/register',[AuthController::class, 'register']);








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

Route::middleware([AdminMiddleware::class])->group(function() {
    
    Route::post('admin/info',[AuthController::class, 'getCurrentUser']);
    // * books management
     //pagination 6
    
    
    Route::delete('books/{id}', [BookController::class, 'destroy']);

});




    Route::get('books/{id}', [BookController::class, 'show']);


// * authors management




// * categories management
  // also uses in admin panel, book create dropdown





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



















