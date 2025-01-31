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
        $author = new Author();
        $author->name = $data["name"];
        $author->bio = $data["bio"];
        
        if(isset($data["image"])){
            $author->image = $this->saveAuthorImage($data["image"]);
        }
        
        $author->save();
        return $author;
    }

    private function saveAuthorImage($imageFile){
        $imageName = time().'.'.$imageFile->extension();
        $imageFile->move(public_path('images'), $imageName);
        $imagePath = 'images/' . $imageName;
        return $imagePath;
    }

    private function deleteAuthorImage(){

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
