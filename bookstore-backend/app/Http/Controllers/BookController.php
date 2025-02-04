<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Book;
use App\Service\BookService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\BookResource;
use App\Http\Resources\AuthorResource;
use App\Http\Requests\CreateBookRequest;
use App\Http\Resources\BookWithStatusResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookController extends Controller
{
    public function __construct(
        private readonly BookService $bookService,
    ){}


    public function index(){
        $books = $this->bookService->allBooks();
        return response()->json(
            BookResource::collection($books)
        , 200);
    }

    public function bookWithPaginate(){
        $books = $this->bookService->allBooksWithPagination(6);
        return response()->json([
            'data' => BookWithStatusResource::collection($books),
            'current_page' => $books->currentPage(),
            'last_page' => $books->lastPage(),
            'has_more_pages' => $books->hasMorePages(),
        ], 200);
    }

    public function bookWithPaginateHome(){
        $books = $this->bookService->allBooksWithPagination(12);
        return response()->json([
            'data' => BookWithStatusResource::collection($books),
            'current_page' => $books->currentPage(),
            'last_page' => $books->lastPage(),
            'has_more_pages' => $books->hasMorePages(),
        ], 200);
    }

    public function show($id){
        try{
            $book = $this->bookService->getBook($id);
            return response()->json([
                new BookResource($book)
            ], 200);
        } catch (Exception $e){
            Log::error($e->getMessage());
            Log::info("error in BookConntroller@show");
            return response()->json([
                'message' => 'Book not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }


    // get author of the book
    public function getBookAuthor($id){
        try{
            $author = $this->bookService->getBookAuthor($id);
            return response()->json([
                new AuthorResource($author)
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Book or Author not found'
            ], 404);
        }
    }


    public function showBorrowedHistory($id){
        try{
            $borrowedHistory = $this->bookService->BorrowedHistory($id);
            return response()->json([
                'borrowedHistory' => $borrowedHistory
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Author not found'
            ], 404);
        } catch (Exception $e){
            Log::error($e->getMessage());
            Log::info("error in BookConntroller@showBorrowedHistory");
            return response()->json([
                'message' => 'Book not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }


    public function  showBooksByCategory($id){
        try{
            $books = $this->bookService->getBooksByCategory($id);
            return response()->json(
                BookResource::collection($books)
            , 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        } catch(Exception $e){
            Log::error($e->getMessage());
            Log::info("error in BookConntroller@showBooksByCategory");
            return response()->json([
                'message' => 'Category not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }


    public function store(CreateBookRequest $request){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $book = $this->bookService->createBook($data);
            DB::commit();
            return response()->json([
                new BookResource($book)
            ], 201);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info("error in BookConntroller@store");
            return response()->json([
                'message' => 'Failed to create book',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function update(CreateBookRequest $request, $id){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $book = $this->bookService->updateBook($id, $data);
            DB::commit();
            return response()->json([
                new BookResource($book)
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info("error in BookConntroller@update");
            return response()->json([
                'message' => 'Failed to update book',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function destroy($id){
        try{
            DB::beginTransaction();
            $book = $this->bookService->deleteBook($id);
            DB::commit();
            return response()->json([
                "message"=> "book deleted successfully"
            ], 200);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info('Error in BookController@destroy');
            return response()->json([
                'message' => 'Failed to delete Book',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
