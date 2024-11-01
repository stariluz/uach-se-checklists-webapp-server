const Sequelize = require('sequelize');

const checklistGuestModel = require('./models/checklist-guest');
const checklistModel = require('./models/checklist');
const permissionModel = require('./models/permission');
const rolPermissionModel = require('./models/rol-permission');
const rolModel = require('./models/rol');
const taskGroupModel = require('./models/task-group');
const taskModel = require('./models/task');
const userModel = require('./models/user');
const user = require('./models/user');
const { use } = require('./routes');

const sequelize = new Sequelize('SLLTC', 'root', 'Emiliano18@', {
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

User.hasMany(Checklist, {as:'checklist'});
Checklist.belongsTo(User, {as: 'user'});
User.hasMany(ChecklistGuest, {as:'checklistGuest'});
ChecklistGuest.belongsTo(user, {as:'user'});
Checklist.hasMany(Task, {as:'task'});
Task.belongsTo(Checklist, {as: 'checklist'});
Checklist.hasMany(TaskGroup, {as:'taskgroup'});
TaskGroup.belongsTo(Checklist, {as:'checklist'});
TaskGroup.hasMany(Task, {as:'task'});
Task.belongsTo(TaskGroup, {as: 'taskgroup'});
Checklist.hasMany(ChecklistGuest, {as: 'checklistguest'});
ChecklistGuest.belongsTo(Checklist, {as: 'checklist'});
Rol.hasMany(RolPermission, {as: 'rolpermission'});
RolPermission.belongsTo(Rol, {as: 'rol'});
Permission.hasMany(RolPermission, {as: 'rolpermission'});
RolPermission.belongsTo(Permission, {as: 'permission'});

sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos sincronizada correctamente");
})

module.exports = {User,Checklist,ChecklistGuest,Permission,RolPermission,Rol,TaskGroup,Task};