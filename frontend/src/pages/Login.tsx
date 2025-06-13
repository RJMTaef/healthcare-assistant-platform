import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Spinner } from '../components/ui/Spinner';
import { useToast } from '../components/ui/ToastProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast('Login successful!', 'success');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Login failed', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <User className="w-6 h-6 text-primary" /> Login
          </h2>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-sm text-muted text-center mt-2">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">Register</Link>
          </div>
        </form>
      </Card>
    </div>
  );
} 