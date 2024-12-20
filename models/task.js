module.exports = (sequelize, type) => {
    const Task = sequelize.define('tasks', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        title: type.STRING,
        due_date: type.DATE,
        is_complete: type.BOOLEAN,
        completed_at: type.DATE,
        //createdAt: type.DATE,
        //updatedAt: type.DATE
    });
    return Task;
}