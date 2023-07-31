"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.hasMany(models.Comments, { foreignKey: "idPost" });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
