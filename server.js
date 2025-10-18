import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileroutes.js';
import pool from './config/db.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.COOKIES_SECURITY,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Health route
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);

    try {
        const initSqlPath = path.resolve('./models/init.sql');
        const sql = fs.readFileSync(initSqlPath, 'utf8');
        await pool.query(sql);
        console.log('Database initialized from init.sql');
    } catch (err) {
        console.error('DB init error:', err);
    }
});
