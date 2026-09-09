<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormSubmitted;
use App\Models\ContactMessage;
use App\Models\SiteConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function index()
    {
        $items = ContactMessage::query()
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (ContactMessage $m) => $this->serialize($m));

        return response()->json([
            'success' => true,
            'data' => $items,
            'count' => $items->count(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:64',
            'message' => 'required|string|max:10000',
        ]);

        $msg = ContactMessage::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'message' => $data['message'],
        ]);

        $config = SiteConfig::merged();
        $recipient = filter_var($config['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $siteName = $config['siteName'] ?? config('app.name');

        if ($recipient) {
            try {
                Mail::to($recipient)->send(new ContactFormSubmitted($msg->fresh(), $siteName));
            } catch (\Throwable $e) {
                Log::warning('contact.message.mail_failed', [
                    'message_id' => $msg->id,
                    'error' => $e->getMessage(),
                ]);
            }
        } else {
            Log::notice('contact.message.no_recipient', ['message_id' => $msg->id]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $msg->id,
            ],
            'message' => 'Message envoyé.',
        ], 201);
    }

    public function update(Request $request, string $id)
    {
        $msg = ContactMessage::find($id);
        if (! $msg) {
            return response()->json(['success' => false, 'error' => 'Message introuvable'], 404);
        }

        $data = $request->validate([
            'read' => 'sometimes|boolean',
        ]);

        if (array_key_exists('read', $data)) {
            $msg->read_at = $data['read'] ? now() : null;
            $msg->save();
        }

        return response()->json([
            'success' => true,
            'data' => $this->serialize($msg->fresh()),
        ]);
    }

    public function destroy(string $id)
    {
        $msg = ContactMessage::find($id);
        if (! $msg) {
            return response()->json(['success' => false, 'error' => 'Message introuvable'], 404);
        }
        $msg->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message supprimé',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function serialize(ContactMessage $m): array
    {
        return [
            'id' => $m->id,
            'name' => $m->name,
            'email' => $m->email,
            'phone' => $m->phone,
            'message' => $m->message,
            'readAt' => $m->read_at?->toIso8601String(),
            'createdAt' => $m->created_at->toIso8601String(),
        ];
    }
}
