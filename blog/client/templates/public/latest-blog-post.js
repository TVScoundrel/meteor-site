Template.latestBlogPost.helpers({
  blogPost: function() {
    return BlogPosts.findOne();
  }
});
