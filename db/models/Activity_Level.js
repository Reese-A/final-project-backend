const bookshelf = require('./bookshelf');

class Activity_Level extends bookshelf.Model {
  get tableName() {
    return 'activity_levels';
  }
  get hasTimestamps() {
    return true;
  }

  user_profiles() {
    return this.hasMany('User_Profile', 'activity_level_id');
  }
}

module.exports = bookshelf.model('Activity_Level', Activity_Level);
