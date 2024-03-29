const DataTypes = require("sequelize");

const defineTaskModel = (sequelize) =>
  sequelize.define("Tasks", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
  });

module.exports = { defineTaskModel };
