<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'error' => 'Identifiants incorrects',
            ], 401);
        }

        $user->tokens()->delete();
        $token = $user->createToken('admin')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => $this->serializeUser($user),
            ],
            'message' => 'Connexion réussie',
        ]);
    }

    public function ping(Request $request)
    {
        $hasUser = User::query()->exists();
        $user = $request->user();

        return response()->json([
            'success' => true,
            'adminConfigured' => $hasUser,
            'user' => $user ? $this->serializeUser($user) : null,
        ]);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_super_admin' => (bool) $user->is_super_admin,
            'permissions' => $user->permissions ?? [],
        ];
    }
}
