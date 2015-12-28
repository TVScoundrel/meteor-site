Template.userAdmin.onCreated(() => {
  Template.instance().subscribe('users');
});

Template.userAdmin.helpers({
  users: () => {
    var users = Meteor.users.find();
    return users;
  }
});

Template.userAdmin.events({
  'change [name="userRole"]': function (event, template) {
    let role = $(event.target).find('option:selected').val();
    
    Meteor.call("setRoleOnUser", {
      user: this._id,
      role: role
    }, (error, response) => {
      if (error) Bert.alert(error.reason, 'warning');
    });
  }
});
