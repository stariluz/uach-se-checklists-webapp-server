module.exports = (sequelize, type) => {
    const Task = sequelize.define('tasks', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        title: type.STRING,
        due_date: type.DATE,
        completed_at: type.DATE,
        created_at: type.DATE,
        updated_at: type.DATE
    });
    return Task;
}