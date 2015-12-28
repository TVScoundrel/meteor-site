const userAdminRoutes = FlowRouter.group({
  name: 'user admin',
  authentication: {
    requireLoggedIn: true,
    redirectPath: '/login',
    roles: ['super-admin', 'user-admin']
  }
});

userAdminRoutes.route( '/user-admin', {
  name: 'user-admin',
  action() {
    BlazeLayout.render( 'default', { yield: 'user-admin' } );
  }
});

