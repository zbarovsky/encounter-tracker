'use strict';
module.exports = (sequelize, DataTypes) => {
  const monster = sequelize.define('monster', {
    name: DataTypes.STRING,
    health: DataTypes.INTEGER,
    initiative: DataTypes.INTEGER
  }, {});
  monster.associate = function(models) {
    // associations can be defined here
  };
  return monster;
};