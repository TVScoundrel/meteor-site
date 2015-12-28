Template.registerHelper('isAuthorized', () => {
  var loggedInUser = Meteor.user();
  var authData = FlowRouter.current().route.group.options.authentication;
  if (authData.roles != null)
    return Roles.userIsInRole(loggedInUser, authData.roles);
  return true;
});

Template.registerHelper('isCurrentUser', (currentUser) => {
  return currentUser === Meteor.userId() ? true : false;
});

Template.registerHelper('disableIfAdmin', (userId) => {
  if (Meteor.userId() === userId) {
    return Roles.userIsInRole(userId, 'super-admin') ? "disabled" : "";
  }
});

Template.registerHelper('selected', (v1, v2) => {
  return v1 === v2 ? true : false;
});
