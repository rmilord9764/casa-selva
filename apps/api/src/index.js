import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pool } from './db/pool.js';
import { getAvailability } from './services/availability.js';
import { bookings } from './routes/bookings.js';
import { account } from './routes/account.js';
import { config } from './config.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientUrl || true }));
app.use(express.json());
app.use(rateLimit({ windowMs: 60000, max: 120 }));

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.get('/api/experiences', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT id, slug, name, description, duration_min, base_price_cents, max_guests, image_url FROM experiences WHERE active = true ORDER BY base_price_cents'
        );
        res.json(rows);
    } catch (err) {
        console.error('experiences error', err.message);
        res.status(500).json({ error: 'No se pudieron cargar las experiencias' });
    }
});

app.get('/api/availability', async (req, res) => {
    try {
        const experienceId = req.query.experienceId || null;
        const from = req.query.from || new Date().toISOString();
        const to = req.query.to || new Date(Date.now() + 60 * 864e5).toISOString();
        const slots = await getAvailability(experienceId, from, to);
        res.json(slots);
    } catch (err) {
        console.error('availability error', err.message);
        res.status(500).json({ error: 'No se pudo cargar la disponibilidad' });
    }
});

app.use('/api/bookings', bookings);
app.use('/api/account', account);

app.listen(config.port, () => {
    console.log('Casa Selva API escuchando en el puerto ' + config.port);
});
