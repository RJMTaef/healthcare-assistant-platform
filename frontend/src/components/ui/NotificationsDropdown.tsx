import React, { useEffect, useRef, useState } from 'react';
import { Bell, Check, Calendar, User } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';
import { Spinner } from './Spinner';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

const typeIcons: Record<string, React.ReactNode> = {
  appointment: <Calendar className="h-5 w-5 text-blue-500" />,
  profile: <User className="h-5 w-5 text-green-500" />,
};

export function NotificationsDropdown() {
  const { notifications, isLoading, fetchNotifications, markAsRead } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) fetchNotifications();
  }, [open, fetchNotifications]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleNotificationClick = (n: any) => {
    markAsRead(n.id);
    if (n.type === 'appointment') {
      navigate('/appointments');
      setOpen(false);
    } else if (n.type === 'profile') {
      navigate('/profile');
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="relative"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b font-semibold">Notifications</div>
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Spinner size="md" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 flex flex-col items-center gap-2">
                <Bell className="h-8 w-8 text-gray-300 mb-2" />
                No notifications
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  className={`flex w-full items-start gap-3 px-4 py-3 border-b last:border-b-0 text-left transition hover:bg-blue-100 ${n.is_read ? 'bg-gray-50' : 'bg-blue-50'}`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <span>{typeIcons[n.type] || <Bell className="h-5 w-5 text-gray-400" />}</span>
                  <span className="flex-1">
                    <span className="text-sm font-medium">{n.message}</span>
                    <div className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</div>
                  </span>
                  {!n.is_read && (
                    <Check className="h-4 w-4 text-blue-600 ml-2" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 