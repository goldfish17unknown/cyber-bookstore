<?php

namespace App\Service;

use App\Models\Book;
use App\Models\Category;

class BookService
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function allBooks(){
        $books = Book::all();
        $books->load(['author', 'category']);
        return $books;
    }

    public function getBook($id){
        $book = Book::findOrFail($id);
        $book->load(['author', 'category']);
        return $book;
    }

    public function createBook($data){
        $book = Book::create($data);
        return $book;
    }

    public function updateBook($id, $data){
        $book = Book::findOrFail($id);
        $book->update($data);
        return $book;
    }

    public function deleteBook($id){
        $book = Book::findOrFail($id);
        $book->delete();
        return $book;
    }

    public function getBooksByCategory($id){
        $Category = Category::findOrFail($id);
        $books = $Category->books;
        return $books;
    }

    public function getBookAuthor($id){
        $book = Book::findOrFail($id);
        $author = $book->author;
        return $author;
    }

    public function BorrowedHistory($id){
        $book = Book::findOrFail($id);
        return $book->borrowedBooks;
    }
}
