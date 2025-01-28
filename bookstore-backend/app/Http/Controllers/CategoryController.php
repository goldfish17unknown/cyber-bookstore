<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Service\CategoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService,
    ){}


    public function index(){
        $categories = $this->categoryService->getAllCategories();
        return response()->json(CategoryResource::collection($categories) , 200); 
    }


    public function store(CategoryRequest $request){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $category = $this->categoryService->createCategory($data);
            DB::commit();
            return response()->json(new CategoryResource($category), 201);

        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info('Error in CategoryController@store');
            return response()->json([
                'message' => 'Failed to create category',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function update(CategoryRequest $request, $id){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $category = $this->categoryService->updateCategory($id, $data);
            DB::commit();
            return response()->json(new CategoryResource($category), 200);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info('Error in CategoryController@update');
            return response()->json([
                'message' => 'Failed to update category',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id){
        try{
            DB::beginTransaction();
            $category = $this->categoryService->deleteCategory($id);
            DB::commit();
            return response()->json(new CategoryResource($category), 200);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info('Error in CategoryController@destroy');
            return response()->json([
                'message' => 'Failed to delete category',
                'error' => $e->getMessage()
            ], 500);
        }
    }


}
