module.exports = (sequelize, type) => {
    const User = sequelize.define('users', {
        id: {type: type.INTEGER, autoIncrement:true, primaryKey: true},
        google_token: type.STRING,
        email: type.STRING,
        created_at: type.DATE,
        updated_at: type.DATE
    });
    return User;
}