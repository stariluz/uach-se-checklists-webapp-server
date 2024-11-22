const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
    const ChecklistGuest = sequelize.define('checklistsGuests', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        role: {
            type: DataTypes.ENUM('OWNER', 'COLABORATOR', 'SPECTATOR'),
            allowNull: false // Si deseas que sea obligatorio
        }
    });
    return ChecklistGuest;
}