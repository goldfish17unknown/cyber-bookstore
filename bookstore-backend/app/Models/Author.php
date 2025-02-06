<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'name',
        'bio',
        'image'
    ];
    
    public function books()
    {
        return $this->hasMany(Book::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($author) {
            foreach ($author->books as $book) {
                if ($book->image) {
                    $imagePath = public_path($book->image);
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                    }
                }
            }
        });

    }
}
