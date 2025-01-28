<?php

namespace App\Service;

use App\Models\Author;

class AuthorService
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function allAuthors()
    {
        $authors = Author::all();
        return $authors;
    }

    public function getAuthor($id)
    {
        $author = Author::findOrFail($id);
        return $author;
    }

    public function createAuthor($data)
    {
        $author = Author::create($data);
        return $author;
    }

    public function updateAuthor($id, $data)
    {
        $author = Author::findOrFail($id);
        $author->update($data);
        return $author;
    }

    public function deleteAuthor($id)
    {
        $author = Author::findOrFail($id);
        $author->delete();
        return $author;
    }

    public function getBookByAuthor($authorId){
        $author = Author::findOrFail($authorId);
        $books = $author->books;
        return $books;
    }
}
