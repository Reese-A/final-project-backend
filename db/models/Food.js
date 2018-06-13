const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'foods';
  }
  get hasTimestamps() {
    return true;
  }

  category() {
    return this.belongsTo('Category', 'category_id');
  }
}

module.exports = bookshelf.model('Food', Food);
