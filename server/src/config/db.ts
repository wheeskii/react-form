import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'users_db',
    'root',
    'root', {
        dialect: 'mysql',
        host: 'localhost',
        port: 8889
        // port: 3309
    }
);

export const connectDB = async () => {
    try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};
