Meteor.methods({
  convertMarkdown: function(markdown){
    return Blog.modules.server.renderMarkdown(markdown);
  }
});
