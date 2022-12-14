import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { connectDB } from './database/db';
import { errorHandler } from './middleware/errorMiddleware';

import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';

export const db = async (): Promise<void> => {
    await connectDB();
};

void db();

const app = express();

app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
