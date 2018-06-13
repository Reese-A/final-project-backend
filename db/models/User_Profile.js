const bookshelf = require('./bookshelf');

class User_Profile extends bookshelf.Model {
  get tableName() {
    return 'user_profiles';
  }
  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User', 'user_id');
  }
  gender() {
    return this.belongsTo('Gender', 'gender_id');
  }
  activity_level() {
    return this.belongsTo('Activity_Level', 'activity_level_id');
  }
  goal() {
    return this.belongsTo('Goal', 'goal_id');
  }
}

module.exports = bookshelf.model('User_Profile', User_Profile);
