#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  💰 MoneyFlow WSL Setup Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Install Homebrew
echo "📦 Step 1: Installing Homebrew..."
echo ""

if command -v brew &> /dev/null; then
    echo "✅ Homebrew is already installed!"
    brew --version
else
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.bashrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    
    echo "✅ Homebrew installed!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 2: Install Python
echo "🐍 Step 2: Installing Python via Homebrew..."
echo ""

brew install python@3.11

echo "✅ Python installed!"
python3 --version
pip3 --version

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 3: Install Node.js
echo "📗 Step 3: Installing Node.js via Homebrew..."
echo ""

brew install node

echo "✅ Node.js installed!"
node --version
npm --version

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 4: Navigate to project and install dependencies
echo "📦 Step 4: Installing MoneyFlow dependencies..."
echo ""

PROJECT_DIR="/mnt/c/TechTide/Apps/MoneyFlow/MoneyFlow"
cd "$PROJECT_DIR"

echo "Installing backend dependencies..."
cd src/backend
pip3 install -r requirements.txt
cd ../..

echo ""
echo "Installing frontend dependencies..."
npm install

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ MoneyFlow Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 To start MoneyFlow:"
echo ""
echo "1. Backend (Terminal 1):"
echo "   cd src/backend"
echo "   python3 main.py"
echo ""
echo "2. Frontend (Terminal 2):"
echo "   npm run dev"
echo ""
echo "3. Open browser to: http://localhost:5173"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

