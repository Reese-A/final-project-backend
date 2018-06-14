const bookshelf = require('./bookshelf');

class Goal extends bookshelf.Model {
  get tableName() {
    return 'goals';
  }
  get hasTimestamps() {
    return true;
  }

  user_profiles() {
    return this.hasMany('User_Profiles', 'goal_id');
  }
}

module.exports = bookshelf.model('Goal', Goal);
