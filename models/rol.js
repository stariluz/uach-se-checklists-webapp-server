module.exports = (sequelize, type) => {
    const Rol = sequelize.define('roles', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        title: type.STRING,
        //created_at: type.DATE,
        //updated_at: type.DATE
    });
    return Rol;
}