# CodeApproach Analyzer Startup Script
Write-Host "🚀 Starting CodeApproach Analyzer..." -ForegroundColor Green

# Kill any existing processes on ports 3000 and 5000
Write-Host "🧹 Cleaning up existing processes..." -ForegroundColor Yellow
$processes3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
$processes5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue

if ($processes3000) {
    $pid3000 = (Get-Process -Id $processes3000.OwningProcess).Id
    Stop-Process -Id $pid3000 -Force -ErrorAction SilentlyContinue
    Write-Host "Stopped process on port 3000" -ForegroundColor Yellow
}

if ($processes5000) {
    $pid5000 = (Get-Process -Id $processes5000.OwningProcess).Id
    Stop-Process -Id $pid5000 -Force -ErrorAction SilentlyContinue
    Write-Host "Stopped process on port 5000" -ForegroundColor Yellow
}

# Start backend
Write-Host "🔧 Starting backend on port 5000..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd '$PWD\backend'; npm run dev" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Test backend health
Write-Host "🩺 Testing backend health..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend is healthy!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Current Status:" -ForegroundColor White
Write-Host "  🔗 Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "  🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  🩺 Health Check: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Your frontend should be running on http://localhost:3000" -ForegroundColor White
Write-Host "  2. Try the 'Load Example' button to test the code analysis" -ForegroundColor White
Write-Host "  3. If you get 'failed to fetch', check that both services are running" -ForegroundColor White
