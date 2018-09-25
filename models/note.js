'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    details: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};