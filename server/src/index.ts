import "reflect-metadata";
import express from 'express';
import { AppDataSource } from "./data/db.dataSource";
import router from "./routes/user.routes";

// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Welcome to users API!"})
// });

AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!");
    
    const app = express();
    const port = 8000;
    
    app.use(express.json());
    app.use('/api', router);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})
.catch((error: any) => {
    console.error("Error during Data Source initialization:", error);
});