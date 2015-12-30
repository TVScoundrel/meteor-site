Template.editorBlogPosts.onCreated(() => {
  Template.instance().subscribe('allPosts');
});

Template.editorBlogPosts.helpers({
  'blogPosts': function () {
    return BlogPosts.find({}, { sort: { createdAt: -1 } });
  }
});

Template.blogPostItem.helpers({
  'pathForPost': function() {
    var post = this;
    var params = {
        _id: post._id
    };
    var routeName = "editor-blog-post";
    var path = FlowRouter.path(routeName, params);
    
    return path;
  }
});
