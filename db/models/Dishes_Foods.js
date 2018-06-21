const bookshelf = require('./bookshelf');

class Dishes_Foods extends bookshelf.Model {
  get tableName() {
    return 'dishes_foods';
  }
  get hasTimestamps() {
    return true;
  }
}

module.exports = bookshelf.model('Dishes_Foods', Dishes_Foods);
