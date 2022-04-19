'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Comment, {
        foreignKey: 'postId'
      });

      Post.hasMany(models.PostLike, {
        foreignKey: 'postId'
      });

      Post.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.TEXT,
    viewed: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });



  return Post;
};