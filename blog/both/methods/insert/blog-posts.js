Meteor.methods({
  insertBlogPost: function(blogPost) {

    var additionalParams = {
      body: " ",
      author: Meteor.user(),
      createdAt: new Date()
    }

    _.extend(blogPost, additionalParams);
    console.log(blogPost);
    blogPost._id = BlogPosts.insert(blogPost);

    return blogPost;
  }
});