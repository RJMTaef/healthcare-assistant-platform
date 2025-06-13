export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
} 