<?php

namespace App\Service;

use App\Models\User;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}

    public function createUser($data)
    {
        $user = new User();
        $user->name = $data["name"];
        $user->email = $data["email"];
        $user->save();
        return $user;
    }

    public function getUsers(?string $search = null)
    {
    $users = User::where('role', 'user');

        if (!empty($search)) {
            $users->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        return $users->latest()->paginate(10);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $user;
    }

    public function getUserById($id){
        return User::findOrFail($id);
    }

    public function getUserBorrowHistory($user){
        return $user->BorrowedBooks()->latest()->get();
    }

    public function editUser($id, $data){
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    
}
