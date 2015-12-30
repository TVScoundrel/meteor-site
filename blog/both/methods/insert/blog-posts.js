Meteor.methods({
  insertBlogPost: function(blogPost) {

    var additionalParams = {
      body: " ",
      author: Meteor.user(),
      createdAt: new Date()
    }

    _.extend(blogPost, additionalParams);
    blogPost._id = BlogPosts.insert(blogPost);

    return blogPost;
  }
});