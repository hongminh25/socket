const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull:false
    }
}, {
    tableName: "user",
    timestamps: true
})

module.exports = { User };
