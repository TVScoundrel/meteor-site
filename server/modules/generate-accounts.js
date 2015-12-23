"use strict";

function createUsers () {
  var users

  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');

    users = [
      {name:"Admin User",email:"admin@admin.com",roles:['admin']}
    ];

    _.each(users, function (userData) {
      var id
      
      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: "D3aDL1ne!",
        profile: { name: userData.name }
      });

      // email verification
      Meteor.users.update({_id: id},
                          {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });
  }
}

Modules.server.createUsers = createUsers;
