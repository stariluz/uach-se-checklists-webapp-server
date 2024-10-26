module.exports = (sequelize, type) => {
    const TaskGroup = sequelize.define('tasksGroup', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        title: type.STRING,
        created_at: type.DATE,
        updated_at: type.DATE
    });
    return TaskGroup;
}