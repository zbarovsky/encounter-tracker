'use strict';
module.exports = (sequelize, DataTypes) => {
  const monster = sequelize.define('monster', {
    name: DataTypes.STRING,
    health: DataTypes.INTEGER,
    initiative: DataTypes.INTEGER
  }, {});
  monster.associate = function(models) {
    models.monster.belongsToMany(models.encounter, {through: "monstersEncounters"})
  };
  return monster;
};