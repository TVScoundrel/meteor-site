Template.latestBlogPost.onCreated(function () {
    Template.instance().subscribe('latestPost');
});

Template.latestBlogPost.helpers({
  blogPost: function() {
    return BlogPosts.findOne();
  }
});
