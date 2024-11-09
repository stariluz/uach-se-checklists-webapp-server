module.exports = (sequelize, type) => {
    const RolPermission = sequelize.define('rolesPermissions', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        //created_at: type.DATE,
        //updated_at: type.DATE
    });
    return RolPermission;
}