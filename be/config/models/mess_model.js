const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { User } = require("./user_model");

const Mess = sequelize.define("messages", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    mess: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    send_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receive_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "messages",
    timestamps: true
})

Mess.belongsTo(User, {
    foreignKey: "send_id",
    as: "sender"
})

Mess.belongsTo(User, {
    foreignKey: "receive_id",
    as: "receiver"
})

module.exports = { Mess };
