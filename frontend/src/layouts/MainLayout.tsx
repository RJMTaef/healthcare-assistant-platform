import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, User, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';
import { useUserStore } from '../store/userStore';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = useUserStore(s => s.user);
  const logout = useUserStore(s => s.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = user ? [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ] : [
    { to: '/', label: 'Home', icon: <HeartPulse className="w-5 h-5" /> },
    { to: '/login', label: 'Login', icon: <LogIn className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="bg-surface shadow flex items-center px-4 py-2 gap-2">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg mr-6">
          <HeartPulse className="w-6 h-6" /> HealthCare
        </Link>
        <div className="flex gap-2 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-1 px-3 py-1 rounded-xl font-medium transition hover:bg-primary-light/10',
                location.pathname === link.to && 'bg-primary text-white shadow'
              )}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 rounded-xl font-medium transition hover:bg-danger/10 text-danger border border-danger bg-transparent"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        )}
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
} 