module.exports = (sequelize, type) => {
    const ChecklistGuest = sequelize.define('checklistsGuests', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        created_at: type.DATE,
        updated_at: type.DATE
    });
    return ChecklistGuest;
}