<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Service\UserService;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Resources\BorrowedBookResource;
use App\Http\Resources\UserResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService
    ){}

    public function index(Request $request){
        $search = $request->query('search');
        $users = $this->userService->getUsers($search);
        Log::info($users);
        return response()->json([
            'data' => UserResource::collection($users),
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
        ], 200);
    }


    public function store(UserRequest $request){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $user = $this->userService->createUser($data);
            DB::commit();
            return response()->json([
                new UserResource($user)
            ], 200);
        } catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info("error in UserConntroller@store");
            return response()->json([
                'message' => 'Failed to update book',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id){
        try{
            $user = $this->userService->getUserById($id);
            return response()->json(
                new UserResource($user)
            , 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        } 
    }

    public function userBorrowHistory($id){
        try{
            $user = $this->userService->getUserById($id);
            $record = $this->userService->getUserBorrowHistory($user);
            Log::info($record);
            return response()->json(
                BorrowedBookResource::collection($record)
            , 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        } 
    }


    public function destroy($id){
        try{
            DB::beginTransaction();
            $this->userService->deleteUser($id);
            DB::commit();
            return response()->json([
                'message' => 'User deleted successfully'
            ], 200);
        } catch(ModelNotFoundException $e){
            DB::rollBack();
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        catch (Exception $e){
            DB::rollBack();
            Log::error($e->getMessage());
            Log::info("error in UserController@delete");
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update (UserRequest $request, $id){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $user = $this->userService->editUser($id, $data);
            DB::commit();
            return response()->json([
                new UserResource($user)
            ], 200);
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'message' => 'User not found'
            ], 404);
        } catch(Exception $e){
            DB::rollback();
            Log::error($e->getMessage());
            Log::info('Error in UserController@update');
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}
