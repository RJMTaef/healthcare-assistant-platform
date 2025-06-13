import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Augment Express Request type to allow req.user
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default authMiddleware; 