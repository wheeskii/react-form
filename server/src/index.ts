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
        // ✅ Step 1: Connect to DB
        await connectDB();
        console.log('Database connected');

        // ✅ Step 2: Sync all models (you can use sequelize.sync() too)
        await sequelize.sync({ force: false });
 // or sequelize.sync()
        console.log('Database synced!');

        // ✅ Step 3: Start server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
