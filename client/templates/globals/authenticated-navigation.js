const getRouteByName = (name) => {
  return _.filter(FlowRouter._routes, (route) => {
    return route.name === name;
  });
}

Template.authenticatedNavigation.helpers({
  
  'isAuthorizedFor': (name) => {
    var loggedInUser = Meteor.user();
    var route = getRouteByName(name);
    var authData = route[0].group.options.authentication;
    if (authData.roles != null)
      return Roles.userIsInRole(loggedInUser, authData.roles);
    return true;
  }
  
});
