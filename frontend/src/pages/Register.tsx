import { useState } from 'react';
import { Button, Card, Input } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Spinner } from '../components/ui/Spinner';
import { useToast } from '../components/ui/ToastProvider';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Split name into first and last for backend compatibility
      const [firstName, ...rest] = name.trim().split(' ');
      const lastName = rest.join(' ') || '-';
      await register({ email, password, firstName, lastName, role });
      showToast('Registration successful!', 'success');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <UserPlus className="w-6 h-6 text-primary" /> Register
          </h2>
          <Input
            label="Name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-muted">Role</label>
            <select
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          <div className="text-sm text-muted text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </form>
      </Card>
    </div>
  );
} 