const bookshelf = require('./bookshelf');

class Dish extends bookshelf.Model {
  get tableName() {
    return 'dishes';
  }
  get hasTimestamps() {
    return true;
  }

  posted_by() {
    return this.belongsTo('User', 'user_id');
  }

  users() {
    return this.belongsToMany('User', 'dishes_users');
  }

  categories() {
    return this.belongsToMany('Category', 'categories_dishes');
  }

  ingredients() {
    return this.belongsToMany('Food', 'dishes_foods').withPivot('servings');
  }
}

module.exports = bookshelf.model('Dish', Dish);
