<?php

use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\SignatureController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CertParticipantController;
use App\Http\Controllers\Api\CertTrainingController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ConseilController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\FormationController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\SiteConfigController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\HeroSlideController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/ping', [AuthController::class, 'ping'])->middleware('auth:sanctum');

Route::get('/health', fn () => response()->json([
    'status' => 'OK',
    'message' => 'Mayelia Academy API (Laravel)',
    'timestamp' => now()->toIso8601String(),
]));

Route::get('/actualites', [ActualiteController::class, 'index']);
Route::get('/actualites/{id}', [ActualiteController::class, 'show']);

Route::get('/conseils', [ConseilController::class, 'index']);
Route::get('/conseils/{id}', [ConseilController::class, 'show']);

Route::get('/formations', [FormationController::class, 'index']);

Route::get('/partners', [PartnerController::class, 'index']);
Route::get('/partners/{id}', [PartnerController::class, 'show']);

Route::get('/site-config', [SiteConfigController::class, 'show']);

Route::get('/hero-slides', [HeroSlideController::class, 'index']);

Route::get('/faqs', [FaqController::class, 'index']);

Route::get('/certificates/verify/{ref}', [CertificateController::class, 'verify']);
Route::get('/certificates/verify/{ref}/pdf', [CertificateController::class, 'verifyPdf']);

Route::post('/contact-messages', [ContactMessageController::class, 'store'])
    ->middleware('throttle:30,1');

// Routes admin nécessitant simplement une session valide (pas de module spécifique).
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/upload/image', [UploadController::class, 'image']);
});

Route::middleware(['auth:sanctum', 'module:actualites'])->group(function () {
    Route::get('/admin/actualites', [ActualiteController::class, 'indexAdmin']);
    Route::get('/admin/actualites/{id}', [ActualiteController::class, 'showAdmin']);
    Route::post('/actualites', [ActualiteController::class, 'store']);
    Route::put('/actualites/{id}', [ActualiteController::class, 'update']);
    Route::delete('/actualites/{id}', [ActualiteController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'module:conseils'])->group(function () {
    Route::get('/admin/conseils', [ConseilController::class, 'indexAdmin']);
    Route::get('/admin/conseils/{id}', [ConseilController::class, 'showAdmin']);
    Route::post('/conseils', [ConseilController::class, 'store']);
    Route::put('/conseils/{id}', [ConseilController::class, 'update']);
    Route::delete('/conseils/{id}', [ConseilController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'module:formations'])->group(function () {
    Route::put('/formations', [FormationController::class, 'replace']);
});

Route::middleware(['auth:sanctum', 'module:partenaires'])->group(function () {
    Route::post('/partners', [PartnerController::class, 'store']);
    Route::put('/partners/{id}', [PartnerController::class, 'update']);
    Route::delete('/partners/{id}', [PartnerController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'module:accueil-slider'])->group(function () {
    Route::put('/admin/hero-slides', [HeroSlideController::class, 'replace']);
});

Route::middleware(['auth:sanctum', 'module:faq'])->group(function () {
    Route::get('/admin/faqs', [FaqController::class, 'indexAdmin']);
    Route::post('/faqs', [FaqController::class, 'store']);
    Route::put('/faqs/{id}', [FaqController::class, 'update']);
    Route::delete('/faqs/{id}', [FaqController::class, 'destroy']);
    Route::post('/faqs/reorder', [FaqController::class, 'reorder']);
});

Route::get('/admin/signature', [SignatureController::class, 'show'])->middleware('auth:sanctum');
Route::post('/admin/signature', [SignatureController::class, 'upload'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'module:certificats'])->group(function () {
    Route::get('/cert-participants', [CertParticipantController::class, 'index']);
    Route::post('/cert-participants', [CertParticipantController::class, 'store']);
    Route::put('/cert-participants/{id}', [CertParticipantController::class, 'update']);
    Route::delete('/cert-participants/{id}', [CertParticipantController::class, 'destroy']);

    Route::get('/cert-trainings', [CertTrainingController::class, 'index']);
    Route::get('/cert-trainings/{id}', [CertTrainingController::class, 'show']);
    Route::post('/cert-trainings', [CertTrainingController::class, 'store']);
    Route::put('/cert-trainings/{id}', [CertTrainingController::class, 'update']);
    Route::delete('/cert-trainings/{id}', [CertTrainingController::class, 'destroy']);
    Route::get('/cert-trainings/{trainingId}/certificates/zip', [CertificateController::class, 'zip']);

    Route::get('/certificates', [CertificateController::class, 'index']);
    Route::post('/certificates', [CertificateController::class, 'store']);
    Route::post('/certificates/bulk', [CertificateController::class, 'bulkStore']);
    Route::delete('/certificates/{id}', [CertificateController::class, 'destroy']);
    Route::get('/certificates/{id}/pdf', [CertificateController::class, 'pdf']);
    Route::get('/certificates/{id}/attestation', [CertificateController::class, 'attestation']);
    Route::patch('/certificates/{id}/validate', [CertificateController::class, 'setValidated']);
    Route::patch('/certificates/{id}/signature', [CertificateController::class, 'setShowSignature']);
});

Route::middleware(['auth:sanctum', 'module:reglages'])->group(function () {
    Route::put('/site-config', [SiteConfigController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'module:messages'])->group(function () {
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::patch('/contact-messages/{id}', [ContactMessageController::class, 'update']);
    Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy']);
});

// Gestion des comptes du backoffice — réservée aux super-administrateurs.
Route::middleware(['auth:sanctum', 'superadmin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::post('/admin/users', [UserController::class, 'store']);
    Route::put('/admin/users/{id}', [UserController::class, 'update']);
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
});
