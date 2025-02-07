<?php

namespace App\Service;

use Carbon\Carbon;
use App\Models\Book;
use App\Models\Category;
use App\Models\BorrowedBook;

class BookService
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function getBooks($search = null, $category = null, $author = null){
        $query = Book::query(); 
        if (!empty($search)) {
            $query->where('title', 'LIKE', "%{$search}%");
        }
        if (!empty($category)){
            $query->where('category_id', $category);
        }
        if(!empty($author)){
            $query->where('author_id', $author);
        }
        return $query->latest()->paginate(6);
    }

    public function getBookById($id){
        $book = Book::findOrFail($id);
        $book->load(['author', 'category']);
        return $book;
    }

    public function createBook($data){
        $book = new Book();
        $book->title = $data["title"];
        $book->description = $data["description"];
        $book->isbn = $data["isbn"];
        $book->author_id = $data["author_id"];
        $book->category_id = $data["category_id"];
        if(isset($data["image"])){
            $book->image = $this->saveBookImage($data["image"]);
        }
        $book->save();
        return $book;
    }

    public function deleteBook($id){
        $book = Book::findOrFail($id);
        if ($book->image) {
            $this->deleteBookImage($book->image);
        }
        $book->delete();
        return $book;
    }

    private function saveBookImage($imageFile){
        $imageName = time().'.'.$imageFile->extension();
        $imageFile->move(public_path('images/books'), $imageName);
        $imagePath = 'images/books/' . $imageName;
        return $imagePath;
    }

    private function deleteBookImage($imagePath){
        $fullPath = public_path($imagePath);
        if(file_exists($fullPath)){
            unlink($fullPath);
        }

    }






    public function allBooksWithPagination($numberPerPage){
        $books = Book::paginate($numberPerPage);
        return $books;
    }

    

    









    public function updateBook($id, $data){
        $book = Book::findOrFail($id);
        $book->update($data);
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
