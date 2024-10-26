const Sequelize = require('sequelize');

const checklistGuestModel = require('./models/checklist-guest');
const checklistModel = require('./models/checklist');
const permissionModel = require('./models/permission');
const rolPermissionModel = require('./models/rol-permission');
const rolModel = require('./models/rol');
const taskGroupModel = require('./models/task-group');
const taskModel = require('./models/task');
const userModel = require('./models/user');

const sequelize = new Sequelize('SLLTC', 'root', 'abcd1234', {
    host: '127.0.0.1',
    dialect: 'mysql'
});


const ChecklistGuest = checklistGuestModel(sequelize, Sequelize);
const Checklist = checklistModel(sequelize, Sequelize);
const Permission = permissionModel(sequelize, Sequelize);
const RolPermission = rolPermissionModel(sequelize, Sequelize);
const Rol = rolModel(sequelize, Sequelize);
const TaskGroup = taskGroupModel(sequelize, Sequelize);
const Task = taskModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos sincronizada correctamente");
})

module.exports = {User,Checklist,ChecklistGuest,Permission,RolPermission,Rol,TaskGroup,Task};