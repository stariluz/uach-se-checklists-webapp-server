module.exports = (sequelize, type) => {
    const ChecklistGuest = sequelize.define('checklistsGuests', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
    });
    return ChecklistGuest;
}