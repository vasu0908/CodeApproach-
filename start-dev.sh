#!/bin/bash

# CodeApproach Analyzer - Development Startup Script
echo "🚀 Starting CodeApproach Analyzer..."

# Check if ports are available
if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5001 is already in use. Killing existing processes..."
    lsof -ti:5001 | xargs kill -9 2>/dev/null
    sleep 2
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use. Killing existing processes..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

echo "📋 Starting backend server on port 5001..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

echo "🌐 Starting frontend server on port 3000..."
cd ../frontend && npm start &
FRONTEND_PID=$!

echo "✅ Servers started:"
echo "   Backend (PID: $BACKEND_PID): http://localhost:5001"
echo "   Frontend (PID: $FRONTEND_PID): http://localhost:3000"
echo "   Health Check: http://localhost:5001/health"
echo ""
echo "🔧 To stop servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📊 Monitoring logs..."
echo "   Backend logs: tail -f backend/server.log"
echo "   Press Ctrl+C to stop monitoring"

# Keep script running and show backend logs
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Monitor backend logs
tail -f backend/server.log 2>/dev/null || echo "Waiting for backend to generate logs..."
