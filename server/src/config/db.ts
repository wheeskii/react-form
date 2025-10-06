import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'notes_db',
    'root',
    'root', {
        dialect: 'mysql',
        host: 'localhost',
        port: 8889
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to the database!")
    }
    catch(err) {
        console.log(err);
    }
}

const db = {
    sequelize,
    connectDB
};

export default db;