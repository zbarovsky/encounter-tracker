'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersEncounters = sequelize.define('usersEncounters', {
    userId: DataTypes.INTEGER,
    encounterId: DataTypes.INTEGER
  }, {});
  usersEncounters.associate = function(models) {
    // associations can be defined here
  };
  return usersEncounters;
};