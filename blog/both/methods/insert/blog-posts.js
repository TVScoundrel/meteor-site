Meteor.methods({
  insertBlogPost: function(blogPost) {
    check(blogPost, {
      title: String
    });
    
    var additionalParams = {
      titleUnsaved: blogPost.title,
      body: " ",
      bodyUnsaved: " ",
      author: Meteor.user(),
      createdAt: new Date()
    }

    _.extend(blogPost, additionalParams);
    blogPost._id = BlogPosts.insert(blogPost);

    return blogPost;
  }
});