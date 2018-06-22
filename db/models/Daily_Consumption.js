const bookshelf = require('./bookshelf');

class Daily_Consumption extends bookshelf.Model {
  get tableName() {
    return 'daily_consumption';
  }
  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('Daily_Consumption', Daily_Consumption);
