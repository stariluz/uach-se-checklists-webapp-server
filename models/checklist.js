module.exports = (sequelize, type) => {
    const Checklist = sequelize.define('checklists', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        title: type.STRING,
        due_date: type.DATE,
        completeness: type.BOOLEAN,
        url: type.STRING,
    });
    return Checklist;
}