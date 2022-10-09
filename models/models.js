var sequelize = require('../db.js');
const { Model, Sequelize, DataTypes } = require('sequelize');

class Category extends Model {}
class Post extends Model {}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
}, {
  sequelize,
  modelName: 'categories',
  timestamps: false,
});

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  contents: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.TIME,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'posts',
  timestamps: false,
});

Category.hasOne(Post, {
  foreignKey: "categoryId"
});
Post.belongsTo(Category);

module.exports = { Post, Category };
