let determineService = (user) => {
  var emailAddress = null;
  var origin = 'twitter';
  if (user.emails != null) {
    emailAddress = user.emails[0].address;
    origin = 'local';
  } else if (user.services.facebook != null) {
    emailAddress = user.services.facebook.email;
    origin = 'facebook';
  } else if (user.services.github != null) {
    emailAddress = user.services.github.email;
    origin = 'github';
  } else if (user.services.google != null) {
    emailAddress = user.services.google.email;
    origin = 'google';
  }
  
  return { emailAddress:emailAddress, origin:origin };
}

Accounts.onCreateUser((options, user) => {
  var service = determineService(user);
  var userData = {
    email: service.emailAddress,
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
    user.origin = service.origin;
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
