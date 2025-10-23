import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost", 
    port: 8889,      
    username: "root",
    password: "root",
    database: "new_db",
    entities: [__dirname + "/../entities/**/*.{ts,js}"],
    synchronize: true,
    
});