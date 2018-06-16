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
    return this.belongsToMany('Dish', 'dishes_users');
  }
}

module.exports = bookshelf.model('User', User);
