import Admin from '../models/Admin.js';
import { signToken } from '../middlewares/auth.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'אימייל וסיסמה נדרשים' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'אימייל או סיסמה שגויים' });
    }

    const token = signToken(admin);
    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function me(req, res) {
  res.json({
    admin: {
      id: req.admin._id || req.admin.id,
      email: req.admin.email,
      name: req.admin.name,
      role: req.admin.role,
    },
  });
}
