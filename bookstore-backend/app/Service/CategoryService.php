<?php

namespace App\Service;

use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}


    public function getAllCategories()
    {
        $categories = Category::latest()->get();
        return $categories;
    }

    public function getCategoryById($id)
    {
        $category = Category::find($id);
        return $category;
    }

    public function createCategory($data)
    {
        $category = Category::create($data);
        return $category;
    }   

    public function updateCategory($id, $data)
    {
        $category = Category::findOrFail($id);
        $category->update($data);
        return $category;
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return $category;
    }

    public function getCategoriesRandom()
    {
        $categories = Category::inRandomOrder()->get();
        return $categories;
    }
}
