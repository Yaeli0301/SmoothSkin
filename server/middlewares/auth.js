import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dropship-dev-secret-change-in-production';

export function signToken(admin) {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function adminAuth(req, res, next) {
  const legacyKey = req.headers['x-admin-key'];
  if (process.env.ADMIN_API_KEY && legacyKey === process.env.ADMIN_API_KEY) {
    req.admin = { role: 'admin', email: 'legacy' };
    return next();
  }

  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'נדרשת התחברות מנהל' });
  }

  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    const admin = await Admin.findById(payload.id).select('-password');
    if (!admin) return res.status(401).json({ error: 'משתמש לא נמצא' });
    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ error: 'טוקן לא תקין או פג תוקף' });
  }
}
