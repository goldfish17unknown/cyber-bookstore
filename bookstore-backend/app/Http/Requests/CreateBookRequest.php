<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $bookId = $this->route('id');

        return [
            'title' => 'required|string|max:225',
            'description' => 'string|required',
            //TODO:: This is temporary image, for testing
            'image' => 'string',
            // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'isbn' => 'required|string|unique:books,isbn,' . $bookId,
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'nullable|exists:categories,id',
            'quantity' => 'required|integer'
        ];
    }

    public function messages(): array
    {
        return [
            //
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
