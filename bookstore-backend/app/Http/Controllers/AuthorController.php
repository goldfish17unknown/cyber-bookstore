<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorRequest;
use Exception;
use Illuminate\Http\Request;
use App\Service\AuthorService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\BookResource;
use App\Http\Resources\AuthorResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthorController extends Controller
{
    public function __construct(
        private readonly AuthorService $authorService,
    ){}


    // uses in admin panel, book create dropdown
    public function index(Request $request){
        $search = $request->query("search");
        $authors = $this->authorService->allAuthors($search);
        return response()->json([
            'data' => AuthorResource::collection($authors),
            'current_page' => $authors->currentPage(),
            'last_page' => $authors->LastPage(),
            'has_more_pages' => $authors->hasMorePages()
        ]
        , 200);
    }

    public function show($id){
        try{
            $author = $this->authorService->getAuthor($id);
            return response()->json(new AuthorResource($author), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Author not found'
            ], 404);
        }
    }

    public function store(AuthorRequest $request){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $author = $this->authorService->createAuthor($data);
            DB::commit();
            return response()->json(new AuthorResource($author), 200);
        } catch(Exception $e){
            DB::rollback();
            Log::error($e->getMessage());
            Log::info('Error in AuthorController@store');
            return response()->json([
                'message' => 'Failed to create author',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    public function update(AuthorRequest $request, $id){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $author = $this->authorService->updateAuthor($id, $data);
            DB::commit();
            return response()->json(new AuthorResource($author), 200);
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Author not found'
            ], 404);
        } catch(Exception $e){
            DB::rollback();
            Log::error($e->getMessage());
            Log::info('Error in AuthorController@update');
            return response()->json([
                'message' => 'Failed to update author',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    public function destroy($id){
        try{
            DB::beginTransaction();
            $author = $this->authorService->deleteAuthor($id);
            DB::commit();
            return response()->json(["message" => "Author Deleted Successfully"], 200);
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Author not found'
            ], 404);
        } catch(Exception $e){
            DB::rollback();
            Log::error($e->getMessage());
            Log::info('Error in AuthorController@destroy');
            return response()->json([
                'message' => 'Failed to delete author',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getBooksByAuthors($id){
        try{
            $books = $this->authorService->getBookByAuthor($id);
            return response()->json([
                BookResource::collection($books)
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Author not found'
            ], 404);
        }
    }

    public function getAuthorSlideShow(Request $request){
        $search = $request->query("search");
        $itemsPerPage = $request->query("itemsPerPage");
        $data = $this->authorService->paginateAuthors($search, $itemsPerPage);
        return response()->json([
            'data' => AuthorResource::collection($data),
            'current_page' => $data->currentPage(),
            'last_page' => $data->lastPage(),
            'has_more_pages' => $data->hasMorePages(),
        ], 200);
    }

    public function getAuthorLimit(Request $request){
        $search = $request->query("search");
        $limit = $request->query("limit");
        $data = $this->authorService->limitAuthors($search, $limit);
        return response()->json(
            AuthorResource::collection($data)
        , 200);
    }
}
