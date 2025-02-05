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

    public function getUser()
    {
        $users = User::where('role', 'user')->latest()->get();
        return $users;
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
    }
}
