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
            'author' => $this->author ? [
                'id' => $this->author_id,
                'name' => $this->author->name,
                'image' => $this->author->image
            ] : null,
            'category' => $this->category ? [
                'id' => $this->category_id,
                'name' => $this->category->name
            ] : null,
            'borrowStatus' => $this->borrowStatus
        ];
    }
}
