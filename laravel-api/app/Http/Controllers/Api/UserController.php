<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $items = User::orderBy('name')->get()->map(fn (User $u) => $this->serialize($u));

        return response()->json(['success' => true, 'data' => $items, 'count' => $items->count()]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedPayload($request, isNew: true);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_super_admin' => $data['is_super_admin'],
            'permissions' => $data['is_super_admin'] ? [] : $data['permissions'],
        ]);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($user),
            'message' => 'Utilisateur créé avec succès',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()->json(['success' => false, 'error' => 'Utilisateur non trouvé'], 404);
        }

        $data = $this->validatedPayload($request, isNew: false, userId: $user->id);

        if ($user->is_super_admin && ! $data['is_super_admin'] && $this->isLastSuperAdmin($user)) {
            return response()->json([
                'success' => false,
                'error' => 'Impossible de retirer les droits du dernier super-administrateur.',
            ], 422);
        }

        $payload = [
            'name' => $data['name'],
            'email' => $data['email'],
            'is_super_admin' => $data['is_super_admin'],
            'permissions' => $data['is_super_admin'] ? [] : $data['permissions'],
        ];
        if (! empty($data['password'])) {
            $payload['password'] = Hash::make($data['password']);
        }
        $user->update($payload);

        return response()->json([
            'success' => true,
            'data' => $this->serialize($user),
            'message' => 'Utilisateur mis à jour avec succès',
        ]);
    }

    public function destroy(Request $request, string $id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()->json(['success' => false, 'error' => 'Utilisateur non trouvé'], 404);
        }

        if ((int) $id === $request->user()->id) {
            return response()->json(['success' => false, 'error' => 'Vous ne pouvez pas supprimer votre propre compte.'], 422);
        }

        if ($user->is_super_admin && $this->isLastSuperAdmin($user)) {
            return response()->json(['success' => false, 'error' => 'Impossible de supprimer le dernier super-administrateur.'], 422);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json(['success' => true, 'message' => 'Utilisateur supprimé avec succès']);
    }

    private function isLastSuperAdmin(User $user): bool
    {
        return User::where('is_super_admin', true)->where('id', '!=', $user->id)->doesntExist();
    }

    private function validatedPayload(Request $request, bool $isNew, ?int $userId = null): array
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'password' => $isNew ? 'required|string|min:8' : 'nullable|string|min:8',
            'is_super_admin' => 'required|boolean',
            'permissions' => 'present|array',
            'permissions.*' => 'string|in:'.implode(',', User::MODULES),
        ]);

        return $validated;
    }

    private function serialize(User $u): array
    {
        return [
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'is_super_admin' => (bool) $u->is_super_admin,
            'permissions' => $u->permissions ?? [],
            'created_at' => $u->created_at?->toIso8601String(),
        ];
    }
}
