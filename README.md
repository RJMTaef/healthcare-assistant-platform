# Healthcare Assistant Platform

A modern, full-stack healthcare assistant platform for patients and doctors. Built with React, TypeScript, Express, PostgreSQL, Zustand, and Docker.

## Features
- User authentication (patient, doctor, admin roles)
- Doctor specialization and profile management
- Appointment booking, status updates, and reminders
- Notifications system (with read/unread support)
- Profile editing and (optional) profile pictures
- Secure JWT-based authentication
- Responsive, accessible UI

## Tech Stack
- **Frontend:** React, TypeScript, Zustand, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **DevOps:** Docker, Docker Compose

## Quick Start (Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/healthcare-assistant-platform.git
cd healthcare-assistant-platform
```

### 2. Set Up Environment Variables
```sh
# Backend
cp backend/env.example backend/.env
# Edit backend/.env with your configuration

# Frontend
cp frontend/env.example frontend/.env
# Edit frontend/.env with your configuration
```

### 3. Start the Database
```sh
docker-compose up -d postgres
```

### 4. Run Database Migrations
```sh
cd backend
npm install
npm run migrate
```

### 5. Start the Backend
```sh
npm run dev
```

### 6. Start the Frontend (in a new terminal)
```sh
cd ../frontend
npm install
npm run dev
```

### 7. Open the App
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Set up environment variables:**
   ```sh
   cp backend/env.example backend/.env
   cp frontend/env.example frontend/.env
   # Edit both .env files with production values
   ```

2. **Deploy with the provided script:**
   ```sh
   ./deploy.sh
   ```

3. **Or deploy manually:**
   ```sh
   docker-compose up --build -d
   ```

### Option 2: Manual Deployment

#### Backend Deployment
```sh
cd backend
npm install
npm run build
npm start
```

#### Frontend Deployment
```sh
cd frontend
npm install
npm run build
# Serve the dist/ folder with your web server
```

### Option 3: Cloud Platform Deployment

#### Heroku
1. Create a Heroku app
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy using Heroku CLI or GitHub integration

#### Railway
1. Connect your GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy automatically

#### Vercel (Frontend) + Railway (Backend)
1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Configure environment variables

## Environment Variables

### Backend (.env)
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/healthcare_assistant

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=https://your-api-domain.com/api
```

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts and profiles
- `appointments` - Appointment bookings
- `notifications` - User notifications

Run migrations to set up the database:
```sh
cd backend
npm run migrate
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update user profile

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment

### Doctors
- `GET /api/doctors` - List all doctors

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification

## Security Considerations

### Production Checklist
- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Configure database with strong passwords
- [ ] Set up SSL certificates
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

### Security Headers
The application includes security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Content-Security-Policy

## Monitoring and Health Checks

### Health Check Endpoints
- Backend: `GET /health`
- Frontend: `GET /health`

### Docker Health Checks
All containers include health checks that monitor service availability.

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check if PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Ensure database exists

2. **CORS errors**
   - Update CORS_ORIGIN in backend .env
   - Check frontend API URL configuration

3. **Build failures**
   - Clear node_modules and reinstall
   - Check TypeScript compilation errors
   - Verify all dependencies are installed

### Logs
```sh
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## Development

### Available Scripts

#### Backend
```sh
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run migrate  # Run database migrations
npm run lint     # Run ESLint
```

#### Frontend
```sh
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Project Structure
```
healthcare-assistant-platform/
├── backend/         # Express API, migrations, routes
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── db/         # Database migrations
│   │   ├── middleware/ # Auth middleware
│   │   ├── routes/     # API routes
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utility functions
│   ├── Dockerfile
│   └── package.json
├── frontend/        # React app, Zustand stores, UI components
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── stores/     # Zustand stores
│   │   └── utils/      # Utility functions
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── deploy.sh
└── README.md
```

## Contributing
1. Fork the repo and create your feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

## License
MIT

---

**For questions or support, open an issue or contact the maintainer.** 