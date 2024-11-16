module.exports = (sequelize, type) => {
    const User = sequelize.define('users', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        google_token: type.STRING, // No parece ser necesario aquí si usas `password`
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        // Opcional: Si usas un campo separado para el `salt`
        salt: type.STRING
    }, {
        timestamps: true // Si deseas incluir createdAt y updatedAt automáticamente
    });

    return User;
};
