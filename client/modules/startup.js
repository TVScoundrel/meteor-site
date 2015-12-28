let startup = () => {
  Template.registerHelper('isAuthorized', () => {
    var loggedInUser = Meteor.user();
    let authData = FlowRouter.current().route.group.options.authentication;
    if (authData.roles != null)
      return Roles.userIsInRole(loggedInUser, authData.roles);
    return true;
  });
};

Modules.client.startup = startup;
