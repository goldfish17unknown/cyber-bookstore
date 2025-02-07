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
            'id' => $this->id,
            'user' => [
                'id' => $this->user_id,
                'name' => $this->user->name,
                'email' => $this->user->email
            ],
            'book' => [
                'id' => $this->book_id,
                'title' => $this->book->title,
                'image' => $this->book->image
            ],
            'borrowed_at' => $this->borrowed_at,
            'due_at' => $this->due_at,
            'status' => $this->status
        ];
    }
}
