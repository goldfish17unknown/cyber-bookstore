<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    public $fillable = [
        'title',
        'description',
        'image',
        'isbn',
        'author_id',
        'category_id',
        'quantity'
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function borrowedBook()
    {
        return $this->hasMany(BorrowedBook::class);
    }
}
