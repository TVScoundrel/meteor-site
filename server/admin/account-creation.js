let determineEmail = (user) => {
  var emailAddress = null;
  if (user.emails != null) emailAddress = user.emails[0].address;
  else if (user.services.facebook != null) emailAddress = user.services.facebook.email;
  else if (user.services.github != null) emailAddress = user.services.github.email;
  else if (user.services.google != null) emailAddress = user.services.google.email;
  
  return emailAddress;
}

Accounts.onCreateUser((options, user) => {
  var userData = {
    email: determineEmail(user),
    name: options.profile ? options.profile.name : ""
  };
  
  if (userData.email) {
    Meteor.call('sendWelcomeEmail', userData, (error) => {
      if (error) console.log(error)
    });
  }
  
  if (options.profile) {
    options.profile.email = userData.email;
    user.profile = options.profile;
  }
  
  return user;
});

Meteor.methods({
  
  sendWelcomeEmail: (userData) => {
    check(userData, { email: String, name: String });
    
    SSR.compileTemplate('welcomeEmail', Assets.getText("email/templates/welcome-email.html"));
    
    var emailTemplate = SSR.render('welcomeEmail', {
      email: userData.email,
      name: userData.name != "" ? userData.name : null,
      url: "http://www.tomvanschoor.com"
    });
    
    Email.send({
      to: userData.email,
      from: "tomvanschoor.com <noreply@tomvanschoor.com>",
      subject: "Welcome aboard matey!",
      html: emailTemplate
    });
  }
  
});