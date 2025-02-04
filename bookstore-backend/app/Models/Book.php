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

    public function getBorrowStatusAttribute(){
        $latestBorrowedBook = $this->borrowedBooks()->latest()->first();

        if (!$latestBorrowedBook) {
            return 'Available';
        }

        if (!$latestBorrowedBook->returned_at) {
            return 'Unavailable';
        }

        if (Carbon::parse($latestBorrowedBook->due_date)->isPast()) {
            return 'Exceeded due date';
        }

        return 'Available';
    }
}
