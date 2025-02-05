<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Service\UserService;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
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
        $users = $this->userService->getUser($search);
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


    public function delete($id){
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
            Log::info("error in UserConntroller@delete");
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
