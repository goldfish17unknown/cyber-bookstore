<?php

namespace App\Service;

use App\Models\Book;
use App\Models\BorrowedBook;
use Illuminate\Support\Facades\Log;

class BorrowedBookService
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function getBorrowRecord(){
        $record = BorrowedBook::whereNull('returned_at')->latest()->get();
        return $record;
    }

    public function createBorrowRecord($data)
    {
        $record = new BorrowedBook();
        $record->user_id = $data['user_id'];
        $record->book_id = $data['book_id'];
        $record->borrowed_at = now();
        $record->due_at = now()->addDays(7);
        $record->save();
        return $record;
    }

    public function updateReturnedBook($id){
        $record = BorrowedBook::findOrFail($id);
        $record->returned_at = now();
        $record->save();
        return $record;
    }

    public function deleteBorrowRecord($id){
        $record = BorrowedBook::findOrFail($id);
        $record->delete();
        return $record;
    }

    public function isBookAvailable($id){
        $book =  Book::find($id);
        if (!$book){
            return false;  // this is just test
        }
        $status = $book->borrowStatus;
        Log::info($status);
        if($status == "Available"){
            return true;
        } else {
            return false;
        }
    }
}
