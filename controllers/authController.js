import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Signup controller
export async function signup(req, res) {
    try {
        const { fullName, email, gender, phone, password } = req.body;
        
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // existing
        const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length) return res.status(400).json({ message: 'Email already registered' });

        const hashed = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, email, gender, phone, password) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, gender || null, phone || null, hashed]
        );

        req.session.user = { id: result.insertId, fullName, email };
        res.json({ message: 'Signup successful', user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// login controller
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (!rows.length) return res.status(400).json({ message: 'Invalid credentials' });

        const user = rows[0];
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

        // remove password
        delete user.password;
        req.session.user = { id: user.id, fullName: user.full_name, email: user.email };
        res.json({ message: 'Login successful', user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// logout controller
export function logout(req, res) {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout error' });
        res.json({ message: 'Logged out' });
    });
}

// getProfile controller
export async function getProfile(req, res) {
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const [rows] = await pool.execute('SELECT id, full_name, email, gender, phone, profile_image FROM users WHERE id = ?', [userId]);
        res.json(rows[0] || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// updateProfile controller
export async function updateProfile(req, res) {
    try {
        const userId = req.session.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const { email, gender, phone, fullName } = req.body;
        const profile_image = req.file ? req.file.path : undefined;

        const updates = [];
        const params = [];
        if (fullName) { updates.push('full_name = ?'); params.push(fullName); }
        if (email) { updates.push('email = ?'); params.push(email); }
        if (gender) { updates.push('gender = ?'); params.push(gender); }
        if (phone) { updates.push('phone = ?'); params.push(phone); }
        if (profile_image) { updates.push('profile_image = ?'); params.push(profile_image); }

        if (!updates.length) return res.status(400).json({ message: 'No fields to update' });

        params.push(userId);
        const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
        await pool.execute(sql, params);

        const [rows] = await pool.execute('SELECT id, full_name, email FROM users WHERE id = ?', [userId]);
        req.session.user = { id: rows[0].id, fullName: rows[0].full_name, email: rows[0].email };

        res.json({ message: 'Profile updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
