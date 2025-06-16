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

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/healthcare-assistant-platform.git
cd healthcare-assistant-platform
```

### 2. Start the Database (PostgreSQL)
```sh
docker-compose up -d
```

### 3. Run Database Migrations
Copy and run each migration file in `backend/src/migrations/` into your database container:
```sh
docker cp backend/src/migrations/notifications.sql healthcare_assistant_db:/tmp/notifications.sql
docker exec -i healthcare_assistant_db psql -U postgres -d healthcare_assistant -f /tmp/notifications.sql
# Repeat for any other migration files (e.g., add_profile_picture.sql, add_email_verification.sql)
```

### 4. Start the Backend
```sh
cd backend
npm install
npm run dev
```

### 5. Start the Frontend
```sh
cd ../frontend
npm install
npm run dev
```

### 6. Open the App
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```
healthcare-assistant-platform/
├── backend/         # Express API, migrations, routes
├── frontend/        # React app, Zustand stores, UI components
├── docker-compose.yml
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