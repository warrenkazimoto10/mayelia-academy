# Lance le backend (Laravel) et le frontend (Vite) en mode local
# Usage : .\scripts\dev.ps1

$root = Split-Path $PSScriptRoot -Parent
$api  = Join-Path $root "laravel-api"

# ─── Backend : s'assurer que .env pointe sur la config locale ──────────────
$envProd  = Join-Path $api ".env.production.backup"
$envLocal = Join-Path $api ".env.local"
$envFile  = Join-Path $api ".env"

if (Test-Path $envLocal) {
    Copy-Item $envLocal $envFile -Force
    Write-Host "[Backend] Config locale activee (MySQL Laragon)" -ForegroundColor Cyan
} else {
    Write-Host "[Backend] .env.local introuvable, on garde le .env existant" -ForegroundColor Yellow
}

# ─── Backend : demarrer php artisan serve ─────────────────────────────────
Write-Host "[Backend] Demarrage sur http://127.0.0.1:8000 ..." -ForegroundColor Green
$backendLog = Join-Path $env:TEMP "mayelia-laravel.log"
Start-Process -NoNewWindow -FilePath "php" `
    -ArgumentList "artisan", "serve", "--host=127.0.0.1", "--port=8000" `
    -WorkingDirectory $api `
    -RedirectStandardOutput $backendLog `
    -RedirectStandardError  "$backendLog.err"

Start-Sleep -Seconds 2

# ─── Frontend : npm run dev ────────────────────────────────────────────────
Write-Host "[Frontend] Demarrage Vite (VITE_API_URL=http://localhost:8000/api) ..." -ForegroundColor Green
Write-Host "[Frontend] .env charge automatiquement par Vite en mode dev" -ForegroundColor DarkGray

Set-Location $root
& "C:\Program Files\nodejs\npm.cmd" run dev
