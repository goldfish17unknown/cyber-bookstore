<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowedBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => [
                'user_id' => $this->user_id,
                'user_name' => $this->user->name
            ],
            'book' => [
                'book_id' => $this->book_id,
                'book_name' => $this->book->name
            ],
            'borrow_at' => $this->borrow_at,
            'status' => $this->status
        ];
    }
}
