Accounts.validateLoginAttempt(function(attempt) {
  if(Roles.userIsInRole(attempt.user._id, ['inactive'])) {
    attempt.allowed = false;
    throw new Meteor.Error(403, "User account is inactive!");
  }
  return true;
});
