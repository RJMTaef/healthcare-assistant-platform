import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      // Show success message
      alert('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" /> 
            Login to HealthCare Pro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
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
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Register here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 