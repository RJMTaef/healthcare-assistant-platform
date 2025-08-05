import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('patient');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register({ 
        email, 
        password, 
        firstName, 
        lastName, 
        role, 
        specialization: role === 'doctor' ? specialization : undefined 
      });
      alert('Registration successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" /> 
            Register for HealthCare Pro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            {role === 'doctor' && (
              <Input
                label="Specialization"
                type="text"
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                required
              />
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            <div className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 