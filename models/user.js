'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }
  return User;
};