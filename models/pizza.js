'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('Pizza', {
    pizza_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,140],
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    paranoid: true,
  });
  Pizza.associate = function(models) {
    // associations can be defined here
  };
  return Pizza;
};