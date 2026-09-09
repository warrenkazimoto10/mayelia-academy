<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use Illuminate\Http\Request;

class SiteConfigController extends Controller
{
    public function show()
    {
        return response()->json([
            'success' => true,
            'data' => SiteConfig::merged(),
        ]);
    }

    public function update(Request $request)
    {
        $defaults = SiteConfig::defaultData();
        $allowedKeys = array_keys($defaults);
        $incoming = $request->only($allowedKeys);
        $filtered = [];

        foreach ($incoming as $key => $value) {
            $filtered[$key] = is_string($value) ? trim($value) : (string) ($value ?? '');
        }

        $row = SiteConfig::query()->first();
        $current = $row?->data ?? [];
        $merged = array_merge(SiteConfig::defaultData(), $current, $filtered);

        if ($row) {
            $row->update(['data' => $merged]);
        } else {
            SiteConfig::query()->create(['data' => $merged]);
        }

        return response()->json([
            'success' => true,
            'data' => SiteConfig::merged(),
        ]);
    }
}
