Template.login.onRendered( () => {
  Modules.client.login({ form: "#login", template: Template.instance() });
});

Template.login.events({
  'submit form': (event) => event.preventDefault(),
  'click .btn-github': (event) => {
    Meteor.loginWithGithub({
      requestPermissions: ['user:email']
    }, function(error) {
      if (error) Bert.alert(error.reason, 'warning');
    });
  },
  'click .btn-google': (event) => {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(error) {
      if (error) Bert.alert(error.reason, 'warning');
    });
  },
  'click .btn-twitter': (event) => {
    Meteor.loginWithTwitter(function(error) {
      if (error) Bert.alert(error.reason, 'warning');
    });
  },
  'click .btn-facebook': (event) => {
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) Bert.alert(error.reason, 'warning');
    });
  }
});
