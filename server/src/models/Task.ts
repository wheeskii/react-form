import db from "../config/db";
import { DataTypes } from "sequelize";

const Task = db.sequelize.define('Task', {
    taskName: {
        type: DataTypes.STRING,
        validate: {
            max: 150
        }
    },
    content: {
        type: DataTypes.TEXT
    },
    is_complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

// db.sequelize.sync();

export default Task;