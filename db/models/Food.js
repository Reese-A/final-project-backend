const bookshelf = require('./bookshelf');

class Food extends bookshelf.Model {
  get tableName() {
    return 'foods';
  }
  get hasTimestamps() {
    return true;
  }

  category() {
    return this.belongsTo('Category', 'category_id');
  }

  dishes() {
    return this.belongsToMany('Dish', 'dishes_foods');
  }
}

module.exports = bookshelf.model('Food', Food);
