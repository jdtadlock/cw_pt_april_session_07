'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: DataTypes.STRING
  }, {});

  Note.associate = function(models) {
    Note.belongsTo(models.User);
  };

  return Note;
};