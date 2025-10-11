#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  💰 MoneyFlow - WSL Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

PROJECT_DIR="/mnt/c/TechTide/Apps/MoneyFlow/MoneyFlow"
cd "$PROJECT_DIR"

echo "🚀 Starting MoneyFlow Backend..."
cd src/backend
python3 main.py &
BACKEND_PID=$!
cd ../..

echo "Waiting 5 seconds for backend to initialize..."
sleep 5

echo ""
echo "🎨 Starting MoneyFlow Frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ MoneyFlow is starting!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "📝 Process IDs:"
echo "   Backend PID:  $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "🛑 To stop:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⏳ Waiting 10 seconds for servers to fully start..."
sleep 10

echo "Opening browser..."
if command -v wslview &> /dev/null; then
    wslview http://localhost:5173
else
    echo "Open this URL in your Windows browser: http://localhost:5173"
fi

echo ""
echo "✅ MoneyFlow is ready! Press Ctrl+C to stop both servers."
wait

