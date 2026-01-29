#!/bin/bash

# Land Registry Portal - Startup Script

set -e

echo "🚀 Starting Land Registry Portal..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.10+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Python version: $(python3 --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q -r requirements.txt

echo "Running migrations..."
python manage.py migrate

echo "✅ Backend setup complete"
echo ""

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install --quiet
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    echo "VITE_API_URL=http://localhost:8000/api" > .env
fi

echo "✅ Frontend setup complete"
echo ""

# Start services
echo "🚀 Starting services..."
echo ""

# Start backend in background
cd ../backend
source venv/bin/activate
echo "📍 Backend starting on http://localhost:8000"
python manage.py runserver 0.0.0.0:8000 > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

# Give backend time to start
sleep 3

# Start frontend in background
cd ../frontend
echo "📍 Frontend starting on http://localhost:5173"
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo ""
echo "📋 Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000/api"
echo "   Admin Panel: http://localhost:8000/admin"
echo ""
echo "🛑 To stop services, press Ctrl+C"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '👋 Services stopped'; exit 0" SIGINT

wait
