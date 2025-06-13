import { Button, Card } from '../components';
import { HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl text-center">
        <div className="flex flex-col items-center gap-4">
          <HeartPulse className="w-12 h-12 text-primary mb-2" />
          <h1 className="text-4xl font-bold text-primary mb-2">Healthcare Assistant Platform</h1>
          <p className="text-muted mb-6">
            Your all-in-one virtual healthcare assistant. Book appointments, chat with doctors, manage your health records, and more—all in a beautiful, modern interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link to="/login" className="w-full sm:w-auto">
              <Button className="w-full">Login</Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">Register</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
} 