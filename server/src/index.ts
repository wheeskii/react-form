import express from 'express';
import cors from 'cors';
import db from "./config/db";
import Task from './models/Task';
import router from './routes/routes'

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req: any, res: any) => {
    res.status(200).json({ message: "Welcome to task API"})
});

const syncDB = async () => {
    try {
        await Task.sync({ force: false });
        console.log('Database synced!')
    } catch (error) {
        console.error('Error syncing the database: ', error);
        process.exit(1);
    }
}



syncDB().then(() => {
    app.listen(port, async () => {
        console.log(`Server is running on http://localhost:${port}`);
        await db.connectDB();
    });
});