Meteor.publish('users', function () {
  var isAdmin = Roles.userIsInRole(this.userId, 'super-admin');
  if (isAdmin) {
    var users = Meteor.users.find({}, { fields: { "profile": 1, "origin":1, "roles": 1 } });
    return users
  }
});
