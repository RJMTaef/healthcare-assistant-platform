#!/bin/bash

# Healthcare Assistant Platform Deployment Script
# This script builds and deploys the entire application using Docker Compose

set -e  # Exit on any error

echo "🚀 Starting Healthcare Assistant Platform Deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files if they don't exist
echo "📝 Setting up environment files..."

if [ ! -f "backend/.env" ]; then
    echo "Creating backend .env file..."
    cp backend/env.example backend/.env
    echo "⚠️  Please update backend/.env with your production values!"
fi

if [ ! -f "frontend/.env" ]; then
    echo "Creating frontend .env file..."
    cp frontend/env.example frontend/.env
    echo "⚠️  Please update frontend/.env with your production values!"
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🏥 Checking service health..."

# Check database
if docker-compose exec -T postgres pg_isready -U postgres; then
    echo "✅ Database is ready"
else
    echo "❌ Database is not ready"
    exit 1
fi

# Check backend
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Backend API is ready"
else
    echo "❌ Backend API is not ready"
    exit 1
fi

# Check frontend
if curl -f http://localhost:80 > /dev/null 2>&1; then
    echo "✅ Frontend is ready"
else
    echo "❌ Frontend is not ready"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Application URLs:"
echo "   Frontend: http://localhost:80"
echo "   Backend API: http://localhost:3000"
echo "   Health Check: http://localhost:3000/health"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop services: docker-compose down"
echo "🔄 Restart services: docker-compose restart"
echo ""
echo "⚠️  Remember to:"
echo "   1. Update environment variables in .env files"
echo "   2. Change default passwords in production"
echo "   3. Set up SSL certificates for HTTPS"
echo "   4. Configure your domain name" 