module.exports = (sequelize, type) => {
    const Permission = sequelize.define('permissions', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        description: type.STRING,
        created_at: type.DATE,
        updated_at: type.DATE
    });
    return Permission;
}