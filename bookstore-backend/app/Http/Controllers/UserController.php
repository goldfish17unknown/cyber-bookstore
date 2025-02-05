<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Service\UserService;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService
    ){}

    public function index(){
        $users = $this->userService->getUser();
        Log::info($users);
        return response()->json(
            UserResource::collection($users), 200);
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
}
