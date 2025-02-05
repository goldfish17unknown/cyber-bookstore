<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Service\BorrowedBookService;
use App\Http\Requests\BorrowedBookRequest;
use App\Http\Resources\BorrowedBookResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BorrowedBookController extends Controller
{
    public function __construct(
        private readonly BorrowedBookService $borrowedBookService,
    ){}

    public function store(BorrowedBookRequest $request){
        try{
            DB::beginTransaction();
            $data = $request->validate();
            $record = $this->borrowedBookService->createBorrowRecord($data);
            DB::commit();
            return response()->json(
               new BorrowedBookResource($record)
            , 200);
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
    
    public function borrowedList(){
        $records = $this->borrowedBookService->getBorrowRecord();
        return response()->json(
            BorrowedBookResource::collection($records)
        , 200);
    }

    public function returnBook($id){
        try{
            DB::beginTransaction();
            $record = $this->borrowedBookService->updateReturnedBook($id);
            DB::commit();
            return response()->json(
                new BorrowedBookResource($record)
             , 200);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Record not found'
            ], 404);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info("error in BorrowedBookConntroller@returnBook");
            return response()->json([
                'message' => 'Failed to update record',
                'error' => $e->getMessage()
            ], 500);
        }
       
    }


    public function deleteRecord($id){
        try{
            DB::beginTransaction();
            $record = $this->borrowedBookService->deleteBorrowRecord($id);
            DB::commit();
            return response()->json([
                "message"=> "book deleted successfully"
            ], 200);

        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Record not found'
            ], 404);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info("error in BorrowedBookConntroller@deleteRecord");
            return response()->json([
                'message' => 'Failed to delete record',
                'error' => $e->getMessage()
            ], 500);
        }

    }

}
