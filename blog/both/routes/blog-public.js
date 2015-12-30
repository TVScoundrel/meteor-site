const blogPublicRoutes = FlowRouter.group({
  name: 'blog-public'
});

blogPublicRoutes.route( '/', {
  name: 'index',
  subscriptions: function(params, queryParams) {
    // using Fast Render
    this.register('myPost', Meteor.subscribe('latestPost'));
  },
  action() {
    BlazeLayout.render( 'default', { yield: 'latestBlogPost' } );
  }
});
