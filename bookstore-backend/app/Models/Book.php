<?php

namespace App\Models;

use Carbon\Carbon;
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
    ];

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function borrowedBook()
    {
        return $this->hasMany(BorrowedBook::class);
    }

    public function getBorrowStatusAttribute(){
        $latestBorrowedBook = $this->borrowedBook()->latest()->first();
        if (!$latestBorrowedBook) {
            return 'Available';
        }
        if (!$latestBorrowedBook->returned_at) {
            return 'Unavailable';
        }
        return 'Available';
    }
}
