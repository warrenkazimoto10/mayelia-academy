<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || ! $request->user()->is_super_admin) {
            return response()->json([
                'success' => false,
                'error' => 'Réservé aux super-administrateurs',
            ], 403);
        }

        return $next($request);
    }
}
