const bookshelf = require('./bookshelf');

class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }
  get hasTimestamps() {
    return true;
  }

  foods() {
    return this.hasMany('Food', 'category_id');
  }
  dishes() {
    return this.belongsToMany('Dish', 'categories_dishes');
  }
}

module.exports = bookshelf.model('Category', Category);
