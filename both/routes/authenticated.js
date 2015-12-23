const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  authentication: {
    requireLoggedIn: true,
    redirectPath: '/login'
  }
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});
