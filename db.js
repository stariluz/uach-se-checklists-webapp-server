const Sequelize = require('sequelize');

const checklistGuestModel = require('./models/checklist-guest');
const checklistModel = require('./models/checklist');
const taskModel = require('./models/task');
const userModel = require('./models/user');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
);

const ChecklistGuest = checklistGuestModel(sequelize, Sequelize);
const Checklist = checklistModel(sequelize, Sequelize);
const Task = taskModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

User.hasMany(Checklist, { as: 'checklist' });
Checklist.belongsTo(User, { as: 'user' });
User.hasMany(ChecklistGuest, { as: 'guest' });
ChecklistGuest.belongsTo(User, { as: 'user' });
Checklist.hasMany(Task, { as: 'task' });
Task.belongsTo(Checklist, { as: 'checklist' });
Checklist.hasMany(ChecklistGuest, { as: 'guest' });
ChecklistGuest.belongsTo(Checklist, { as: 'checklist' });

sequelize.sync({
    force: false
}).then(() => {
    console.log("Base de datos sincronizada correctamente");
}).catch((e) => {
    console.error(e)
})

module.exports = { sequelize, User, Checklist, ChecklistGuest, Task };