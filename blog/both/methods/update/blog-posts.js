Meteor.methods({
  updateBlogPost: function( changes ){
    check( changes, {
      _id: String,
      body: Match.Optional( String ),
      title: Match.Optional( String )
    });
    
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
