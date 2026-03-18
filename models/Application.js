const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Application = sequelize.define("Application", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  resumeUrl: {   // 🔥 NEW FIELD (VERY IMPORTANT)
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },

}, {
  timestamps: true
});

module.exports = Application;