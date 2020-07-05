'use strict';
module.exports = (sequelize, DataTypes) => {
  const monstersEncounters = sequelize.define('monstersEncounters', {
    monsterId: DataTypes.INTEGER,
    encounterId: DataTypes.INTEGER
  }, {});
  monstersEncounters.associate = function(models) {
    // associations can be defined here
  };
  return monstersEncounters;
};