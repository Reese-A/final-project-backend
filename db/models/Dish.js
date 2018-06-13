const bookshelf = require('./bookshelf');

class Dish extends bookshelf.Model {
  get tableName() {
    return 'dishes';
  }
  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('Dish', Dish);
