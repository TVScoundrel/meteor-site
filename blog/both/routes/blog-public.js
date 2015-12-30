const blogPublicRoutes = FlowRouter.group({
  name: 'blog-public'
});

blogPublicRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'latestBlogPost' } );
  }
});
