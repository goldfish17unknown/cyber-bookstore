<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'isbn' => $this->isbn,
            'author' => [
                'author_id' => $this->author_id,
                'author_name' => $this->author->name
            ],
            'category' => [
                'category_id' => $this->category_id,
                'category_name' => $this->category->name
            ],
        ];
    }
}
