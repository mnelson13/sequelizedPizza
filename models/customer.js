'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,140],
      }
    }
  }, {
    paranoid: true,
  });
  Customer.associate = function(models) {
    Customer.hasMany(models.Pizza)
  };
  return Customer;
};