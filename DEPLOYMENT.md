# Healthcare Assistant Platform - Deployment Guide

This guide provides step-by-step instructions for deploying the Healthcare Assistant Platform to various environments.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- Git

## Quick Deployment (Docker Compose)

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd healthcare-assistant-platform
```

### 2. Configure Environment Variables
```bash
# Copy environment templates
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env

# Edit the files with your production values
nano backend/.env
nano frontend/.env
```

### 3. Deploy
```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Access the Application
- Frontend: http://localhost:80
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

## Cloud Platform Deployments

### Railway (Recommended)

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Create a new project

2. **Add PostgreSQL Service**
   - Click "New Service" → "Database" → "PostgreSQL"
   - Note the connection details

3. **Configure Environment Variables**
   ```env
   DATABASE_URL=your-railway-postgres-url
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy Backend**
   - Set the source directory to `backend`
   - Railway will automatically detect and deploy

5. **Deploy Frontend**
   - Create another service for the frontend
   - Set source directory to `frontend`
   - Add environment variable: `VITE_API_URL=https://your-backend-url.railway.app/api`

### Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-super-secret-jwt-key
   heroku config:set JWT_EXPIRES_IN=24h
   heroku config:set NODE_ENV=production
   ```

5. **Deploy Backend**
   ```bash
   cd backend
   git subtree push --prefix backend heroku main
   ```

6. **Deploy Frontend**
   - Use a static site hosting service like Netlify or Vercel
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`
   - Configure environment variable: `VITE_API_URL=https://your-heroku-app.herokuapp.com/api`

### Vercel + Railway

1. **Deploy Backend to Railway** (follow Railway instructions above)

2. **Deploy Frontend to Vercel**
   - Connect your GitHub repository to Vercel
   - Set the root directory to `frontend`
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-railway-backend-url.railway.app/api`

### DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Backend Service**
   - Source directory: `backend`
   - Build command: `npm run build`
   - Run command: `npm start`
   - Add environment variables

3. **Configure Frontend Service**
   - Source directory: `frontend`
   - Build command: `npm run build`
   - Add environment variable for API URL

4. **Add Database**
   - Create a managed PostgreSQL database
   - Link it to your backend service

## Environment Variables Reference

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server
PORT=3000
NODE_ENV=production

# CORS (for production)
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=https://your-api-domain.com/api
```

## Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Configure database with strong passwords
- [ ] Set up SSL certificates
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets

## Monitoring and Maintenance

### Health Checks
- Backend: `GET /health`
- Frontend: `GET /health`

### Logs
```bash
# Docker Compose
docker-compose logs -f

# Railway
railway logs

# Heroku
heroku logs --tail

# Vercel
vercel logs
```

### Database Backups
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up --build -d
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is running
   - Check firewall settings

2. **CORS Errors**
   - Update CORS_ORIGIN in backend
   - Check frontend API URL configuration

3. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check TypeScript compilation errors

4. **Port Conflicts**
   - Change ports in docker-compose.yml
   - Check if ports are already in use

### Performance Optimization

1. **Database**
   - Add indexes for frequently queried columns
   - Optimize queries
   - Consider read replicas for high traffic

2. **Frontend**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement lazy loading

3. **Backend**
   - Add caching (Redis)
   - Implement rate limiting
   - Use connection pooling

## Support

For deployment issues:
1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Test database connectivity
4. Check network connectivity
5. Review security group/firewall settings

For additional help, create an issue in the repository or contact the maintainer. 