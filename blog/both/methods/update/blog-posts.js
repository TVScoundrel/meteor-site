Meteor.methods({
  draftBlogPost: function(changes){
    check(changes, {
      _id: String,
      bodyUnsaved: Match.Optional(String),
      titleUnsaved: Match.Optional(String)
    });
    
    if (Meteor.isServer) {
      changes.renderedUnsaved = Blog.modules.server.renderMarkdown(changes.bodyUnsaved);
    }
    
    var post = changes._id;
    delete changes._id;

    try {
      var blogPostId = BlogPosts.update(post, {
        $set: changes
      });
      return blogPostId;
    } catch(exception) {
      return exception;
    }
  },
  saveBlogPost: function(changes){
    check(changes, {
      _id: String,
      bodyUnsaved: Match.Optional(String),
      titleUnsaved: Match.Optional(String)
    });
    
    var additionalParams = {
      title: changes.titleUnsaved,
      body: changes.bodyUnsaved,
      author: Meteor.user(),
      createdAt: new Date()
    }
    
        
    _.extend(changes, additionalParams);
    
    changes.lastEditAt = new Date();
    if (Meteor.isServer) {
      changes.rendered = Blog.modules.server.renderMarkdown(changes.body);
    }
    
    var post = changes._id;
    delete changes._id;

    try {
      var blogPostId = BlogPosts.update(post, {
        $set: changes
      });
      return blogPostId;
    } catch(exception) {
      return exception;
    }
  },
  revertBlogPost: function(changes){
    check(changes, {
      _id: String,
      body: Match.Optional(String),
      title: Match.Optional(String)
    });
    
    var additionalParams = {
      titleUnsaved: changes.title,
      bodyUnsaved: changes.body,
      author: Meteor.user(),
      createdAt: new Date()
    }
    
    _.extend(changes, additionalParams);
    
    if (Meteor.isServer) {
      changes.renderedUnsaved = Blog.modules.server.renderMarkdown(changes.body);
    }
    
    var post = changes._id;
    delete changes._id;

    try {
      var blogPostId = BlogPosts.update(post, {
        $set: changes
      });
      return blogPostId;
    } catch(exception) {
      return exception;
    }
  }
});
