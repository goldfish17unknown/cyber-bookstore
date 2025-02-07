<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BorrowedBookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Service\BookService;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');



Route::post('user/register',[AuthController::class, 'register']);



Route::post('user/login',[AuthController::class, 'login']);
Route::post('user/getuser',[AuthController::class, 'getCurrentUser'])->middleware('auth:api');


Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::put('categories/{id}', [CategoryController::class, 'update']);
Route::delete('categories/{id}', [CategoryController::class, 'destroy']);


// Author routes


Route::post('authors', [AuthorController::class, 'store']);
Route::put('authors/{id}', [AuthorController::class, 'update']);
Route::delete('authors/{id}', [AuthorController::class, 'destroy']);
Route::get('authors/{id}/books', [AuthorController::class, 'getBooksByAuthors']);


//Book routes



Route::get('books/{id}/author', [BookController::class, 'getBookAuthor']);
//TODO::To add borrowed history
Route::get('categories/{id}/books', [BookController::class, 'showBooksByCategory']);
Route::put('books/{id}', [BookController::class, 'update']);




Route::get('books/withStatus', [BookController::class, 'bookWithPaginateHome']);

// For admin
// * books
Route::get('books/admin/withStatus', [BookController::class, 'bookWithPaginate']);


// * authors
Route::get('authors', [AuthorController::class, 'index']);
Route::get('authors/{id}', [AuthorController::class, 'show']);


// * books
Route::post('books', [BookController::class, 'store']);
Route::get('books', [BookController::class, 'index']);
Route::get('books/{id}', [BookController::class, 'show']);

Route::delete('books/{id}', [BookController::class, 'destroy']);



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
