// helpers to make it easy to check conditions
const loggedIn = () => {
  return !Meteor.loggingIn() && !!Meteor.user();
}

const userInRole = (authData) => {
  if (!!authData.roles && authData.roles.length > 0)
    return Roles.userIsInRole(Meteor.userId(), authData.roles);
  return true;
}

const userLoggedInStateOk = (authData) => {
  return authData.requireLoggedIn === loggedIn();
}

// this function does the actual work
const handleRedirect = () => {
  FlowRouter.watchPathChange();
  let authData = FlowRouter.current().route.group.options.authentication;
  if (
    authData &&
    (!userLoggedInStateOk(authData) || !userInRole(authData))
  ) {
    FlowRouter.go(authData.redirectPath);
    return true;
  }
}

Template.default.helpers({
  loggingIn() {
    return Meteor.loggingIn();
  },
  loggedIn() {
    return loggedIn();
  },
  authenticatedRedirectRequired() {
    if (Meteor.user() && Meteor.user().roles)
      return handleRedirect();
    return true;
  },
  publicRedirectRequired() {
    return handleRedirect();      
  }
});
