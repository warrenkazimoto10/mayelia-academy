<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureModuleAccess
{
    public function handle(Request $request, Closure $next, string $module): Response
    {
        $user = $request->user();

        if (! $user || (! $user->is_super_admin && ! in_array($module, $user->permissions ?? [], true))) {
            return response()->json([
                'success' => false,
                'error' => 'Accès non autorisé à ce module',
            ], 403);
        }

        return $next($request);
    }
}
