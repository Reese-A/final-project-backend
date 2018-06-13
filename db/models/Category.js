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
}

module.exports = bookshelf.model('Category', Category);
