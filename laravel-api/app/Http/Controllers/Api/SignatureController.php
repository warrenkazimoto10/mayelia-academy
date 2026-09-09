<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SignatureController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        Storage::disk('public')->makeDirectory('certificates');
        $request->file('file')->storeAs('certificates', 'signature.png', 'public');

        return response()->json([
            'success' => true,
            'data' => ['url' => '/storage/certificates/signature.png'],
            'message' => 'Signature enregistrée',
        ]);
    }

    public function show()
    {
        $exists = Storage::disk('public')->exists('certificates/signature.png');

        return response()->json([
            'success' => true,
            'data' => ['url' => $exists ? '/storage/certificates/signature.png' : null],
        ]);
    }
}
