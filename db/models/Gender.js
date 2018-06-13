const bookshelf = require('./bookshelf');

class Gender extends bookshelf.Model {
  get tableName() {
    return 'genders';
  }
  get hasTimestamps() {
    return true;
  }

  user_profiles() {
    return this.hasMany('User_Profle', 'gender_id');
  }
}

module.exports = bookshelf.model('Gender', Gender);
