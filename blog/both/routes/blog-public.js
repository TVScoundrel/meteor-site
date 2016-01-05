const blogPublicRoutes = FlowRouter.group({
  name: 'blog-public'
});

blogPublicRoutes.route('/', {
  name: 'home',
  subscriptions: function (params, queryParams) {
    this.register('myPost', Meteor.subscribe('singlePost', 'BQnwqhzcL9eMQCEha'));
  },
  action() {
    BlazeLayout.render( 'default', { yield: 'blogPost' } );
  }
});

blogPublicRoutes.route('/blog/:_id', {
  name: 'blog',
  subscriptions: function (params, queryParams) {
    this.register('myPost', Meteor.subscribe('singlePost', params._id));
  },
  action() {
    BlazeLayout.render( 'default', { yield: 'blogPost' } );
  }
});

blogPublicRoutes.route('/latest-post', {
  name: 'latest-post',
  subscriptions: function (params, queryParams) {
    this.register('myPost', Meteor.subscribe('latestPost'));
  },
  action() {
    BlazeLayout.render( 'default', { yield: 'blogPost' } );
  }
});
