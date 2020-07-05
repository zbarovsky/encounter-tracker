'use strict';
module.exports = (sequelize, DataTypes) => {
  const encounter = sequelize.define('encounter', {
    title: DataTypes.STRING
  }, {});
  encounter.associate = function(models) {
    models.encounter.belongsToMany(models.monster, {through: "monstersEncounters"});
    models.encounter.belongsToMany(models.user, {through: "usersEncounters"});
  };
  return encounter;
};