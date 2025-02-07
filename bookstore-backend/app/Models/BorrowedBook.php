<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class BorrowedBook extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'borrowed_at',
        'due_at',
        'returned_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function getStatusAttribute(){
        if (is_null($this->returned_at)) {
            // $dueDate = Carbon::parse($this->due_at);
            $dueDate = Carbon::parse($this->due_at);
            if (Carbon::now()->greaterThan($dueDate)) {
                $daysExceeded = Carbon::now()->diffInDays($dueDate, true); 
                $daysExceeded = floor($daysExceeded);
                return "{$daysExceeded} day(s) exceeded";
            }
            return "Not returned";
        }
        return "returned";
    }
}
