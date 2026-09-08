import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from '../server/src/routes/api.js';

dotenv.config({ path: './server/.env' });
dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Support both /api/... and direct /... rewrites on Vercel
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

export default app;
