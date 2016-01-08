Template.blogPostPreview.onCreated(function () {
  var self = this;
  self.autorun(function() {
    var _id = FlowRouter.getParam('_id');
    self.subscribe('singlePost', _id);
  });
});

Template.blogPostPreview.helpers({
  blogPost: function() {
    return BlogPosts.findOne();
  }
});
