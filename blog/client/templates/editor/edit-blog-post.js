const initEditor = function(template) {
  Tracker.autorun(function(computation) {
    var blogPost = BlogPosts.findOne({}, { fields: { 'body': 1 } });
    
    if (blogPost && blogPost.body) {
      
      Meteor.call('convertMarkdown', blogPost.body, function(error, html) {
        if (error) {
          console.log(error.reason);
        } else {
          $('#preview').html(html);
        }
      });

      template.editor.setValue(blogPost.body.trim());

      computation.stop();
    }
  });
};

Template.editBlogPost.onCreated(function () {
  var self = this;
  self.autorun(function() {
    var _id = FlowRouter.getParam('_id');
    if (_id != Session.get('blogPostID')) {
      self.subscribe('singlePost', _id, function () {
        var blogPost = BlogPosts.findOne();
        Session.set('blogPostID', _id);
        Session.set('blogPostTitle', blogPost.title);
        Session.set('blogPostBody', blogPost.body);
      });
    }
  });
});

Template.editBlogPost.onRendered(function () {
  this.docId = FlowRouter.getParam('_id');
});

Template.editBlogPost.helpers({
  blogPostTitle: function () {
    return Session.get('blogPostTitle');
  },
  editorOptions: function () {
    return {
      lineNumbers: true,
      fixedGutter: true,
      mode: 'markdown',
      lineWrapping: true,
      cursorHeight: 0.85,
      theme: 'blackboard'
    }
  }
});

Template.editBlogPost.events({
  'keyup .CodeMirror': function(event, template) {
    var body = template.find('#editor').value;
    if (body !== '') {
      Meteor.callPromise('convertMarkdown', body).then(function (html) {
        $('#preview').html(html);
        return Meteor.callPromise('updateBlogPost', { _id: template.docId, body: body });
      }).catch( function (error) {
        Bert.alert(error.reason, 'danger');
      });
    }
  },
  'keyup #blogPostTitle': function(event, template) {
    var title = event.target.value;
    var body = template.editor.getValue();
    if (title !== '' && body !== '') {
      Meteor.callPromise('updateBlogPost', { _id: template.docId, body: body, title: title }).catch(function (error) {
        Bert.alert(error.reason, 'danger');
      });
    }
  }
});
