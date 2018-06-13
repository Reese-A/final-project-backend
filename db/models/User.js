const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  user_profile() {
    return this.hasOne('User_Profile', 'user_id');
  }
  dishes() {
    return this.hasMany('Dish', 'user_id');
  }
}

module.exports = bookshelf.model('User', User);
