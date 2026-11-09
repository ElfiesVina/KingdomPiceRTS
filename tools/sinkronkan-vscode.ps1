$ErrorActionPreference = "Stop"

# Sinkronkan folder VS Code dengan branch kerja resmi di GitHub.
$namaBranch = "up/phase-1-vertical-slice"
$remote = "origin"

# Pastikan perintah dijalankan dari dalam repository Git.
$akarRepo = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0 -or -not $akarRepo) {
    throw "Folder ini bukan repository Git. Buka terminal di folder KingdomPiceRTS."
}
Set-Location $akarRepo

# Jangan menimpa perubahan lokal yang belum disimpan.
git diff --quiet
if ($LASTEXITCODE -ne 0) {
    throw "Ada perubahan pada file yang belum di-commit. Commit atau simpan dahulu sebelum sinkronisasi."
}
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    throw "Ada perubahan yang sudah di-stage tetapi belum di-commit. Commit dahulu sebelum sinkronisasi."
}

Write-Host "Mengambil pembaruan dari GitHub..." -ForegroundColor Cyan
git fetch $remote
if ($LASTEXITCODE -ne 0) {
    throw "Gagal mengambil data dari GitHub. Periksa koneksi dan remote origin."
}

# Beralih ke branch Phase 1. Branch lokal dibuat otomatis jika belum ada.
git show-ref --verify --quiet "refs/heads/$namaBranch"
if ($LASTEXITCODE -eq 0) {
    git switch $namaBranch
} else {
    git switch --track "$remote/$namaBranch"
}
if ($LASTEXITCODE -ne 0) {
    throw "Gagal beralih ke branch $namaBranch."
}

Write-Host "Menyamakan file lokal dengan GitHub..." -ForegroundColor Cyan
git pull --ff-only $remote $namaBranch
if ($LASTEXITCODE -ne 0) {
    throw "Sinkronisasi gagal. Tidak ada perubahan lokal yang ditimpa."
}

Write-Host ""
Write-Host "Sinkronisasi selesai." -ForegroundColor Green
Write-Host "Branch aktif: $namaBranch" -ForegroundColor Green
git status --short --branch
