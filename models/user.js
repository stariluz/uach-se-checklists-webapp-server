module.exports = (sequelize, type) => {
    const User = sequelize.define('users', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        picture_url: type.STRING,
        google_token: type.STRING,
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        // Opcional: Si usas un campo separado para el `salt`
        salt: type.STRING
    }, {
        timestamps: true 
    });

    return User;
};
