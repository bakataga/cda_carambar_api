const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blague = sequelize.define('blague', {
  texte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reponse: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'Blagues',  
  timestamps: true       
});

module.exports = Blague;
