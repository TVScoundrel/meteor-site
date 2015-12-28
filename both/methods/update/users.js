Meteor.methods({
  setRoleOnUser(options) {
    check(options, {
      user: String,
      role: String
    });
    
    try {
      var loggedInUser = Meteor.user();
      if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['super-admin', 'user-admin']))
        throw new Meteor.Error(403, "Access denied");
      Roles.setUserRoles(options.user, [options.role]);
    } catch (exception) {
      return exception;
    }
  }
});
