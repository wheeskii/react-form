import express from 'express';
import cors from 'cors';
import db from "./config/db";
import Task from './models/Task';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// const submittedForms: any = [];

// Syncing all models
const syncDB = async () => {
    try {
        await Task.sync({ force: false });
        console.log('Database synced!')
    } catch (error) {
        console.error('Error syncing the database: ', error);
        process.exit(1);
    }
}


app.get('/api/form', (req: any, res: any) => {
    //   res.json(submittedForms);
});

app.post('/api/form', (req: any, res: any) => {
    const { name, email } = req.body;
    
    if(!name || !email) {
        return res.status(400).json({ message: "Missing fields." });
    }
    
    // submittedForms.push({ name, email})
    
    return res.status(200).json({ 
        message: 'Form received', 
        data: { name, email }
    });
    
});

syncDB().then(() => {
    app.listen(port, async () => {
        console.log(`Server is running on http://localhost:${port}`);
        await db.connectDB();
    });
});