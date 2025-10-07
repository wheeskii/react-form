import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import { connectDB, sequelize } from './config/db';
import { User } from './models/User';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to users API" });
});

const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected');

        await sequelize.sync({ force: false });

        console.log('Database synced!');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
