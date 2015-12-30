Meteor.methods({
  updateBlogPost: function( changes ){
    check( changes, {
      _id: String,
      body: Match.Optional( String ),
      title: Match.Optional( String )
    });
    
    changes.lastEditAt = new Date();
    if (Meteor.isServer) {
      changes.rendered = Blog.modules.server.renderMarkdown(changes.body);
    }
    
    var post = changes._id;
    delete changes._id;

    try {
      var blogPostId = BlogPosts.update( post, {
        $set: changes
      });
      return blogPostId;
    } catch(exception) {
      return exception;
    }
  }
});
