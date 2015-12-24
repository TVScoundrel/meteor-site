Template.login.onRendered( () => {
  Modules.client.login({ form: "#login", template: Template.instance() });
});

Template.login.events({
  'submit form': (event) => event.preventDefault(),
  'click .btn-github': (event) => {
    Meteor.loginWithGithub({
      requestPermissions: ['email']
    }, function(error) {
      if (error) console.log(error);
    });
  },
  'click .btn-google': (event) => {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(error) {
      if (error) console.log(error);
    });
  },
  'click .btn-twitter': (event) => {
    Meteor.loginWithTwitter(function(error) {
      if (error) console.log(error);
    });
  },
  'click .btn-facebook': (event) => {
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) console.log(error);
    });
  }
});
