Template.blogPost.helpers({
  blogPost: function() {
    return BlogPosts.findOne();
  }
});
