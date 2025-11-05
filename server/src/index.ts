import dotenv from 'dotenv';
import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./data/db.dataSource";
import router from "./routes/user.routes";
import cookieParser from 'cookie-parser';

// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Welcome to users API!"})
// });

dotenv.config();

AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!");
    
    const app = express();
    const port = 8000;
    
    app.use(cors({ origin: "http://localhost:5173", credentials: true}));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api', router);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})
.catch((error: any) => {
    console.error("Error during Data Source initialization:", error);
});