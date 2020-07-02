'use strict';
module.exports = (sequelize, DataTypes) => {
  const encounter = sequelize.define('encounter', {
    title: DataTypes.STRING
  }, {});
  encounter.associate = function(models) {
    // associations can be defined here
  };
  return encounter;
};