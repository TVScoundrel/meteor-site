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
        Session.set('blogPostTitleUnsaved', blogPost.titleUnsaved);
        Session.set('blogPostBodyUnsaved', blogPost.bodyUnsaved);
      });
    }
  });
});

Template.editBlogPost.onRendered(function () {
  this.docId = FlowRouter.getParam('_id');
});

Template.editBlogPost.helpers({
  blogPostTitleUnsaved: function () {
    return Session.get('blogPostTitleUnsaved');
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
  },
  savedState: function () {
    return (
      Session.get('blogPostTitle') == Session.get('blogPostTitleUnsaved') &&
      Session.get('blogPostBody') == Session.get('blogPostBodyUnsaved')
    );
  }
});

Template.editBlogPost.events({
  'keyup .CodeMirror': function (event, template) {
    var body = template.find('#editor').value;
    if (body !== '') {
      return Meteor.callPromise('draftBlogPost', { _id: template.docId, bodyUnsaved: body }).catch( function (error) {
        Bert.alert(error.reason, 'danger');
      });
    }
  },
  'keyup #blogPostTitle': function (event, template) {
    var title = event.target.value;
    var body = template.find('#editor').value;
    Session.set('blogPostTitleUnsaved', title);
    if (title !== '' && body !== '') {
      Meteor.callPromise('draftBlogPost', { _id: template.docId, bodyUnsaved: body, titleUnsaved: title }).catch(function (error) {
        Bert.alert(error.reason, 'danger');
      });
    }
  },
  'click #revertButton': function (event, template) {
    Session.set('blogPostTitleUnsaved', Session.get('blogPostTitle'));
    Session.set('blogPostBodyUnsaved', Session.get('blogPostBody'));
    Meteor.callPromise('revertBlogPost', { _id: template.docId, body: Session.get('blogPostBody'), title: Session.get('blogPostTitle') }).catch(function (error) {
      Bert.alert(error.reason, 'danger');
    });
  },
  'click #saveButton': function (event, template) {
    Session.set('blogPostTitle', Session.get('blogPostTitleUnsaved'));
    Session.set('blogPostBody', Session.get('blogPostBodyUnsaved'));
    Meteor.callPromise('saveBlogPost', { _id: template.docId, bodyUnsaved: Session.get('blogPostBodyUnsaved'), titleUnsaved: Session.get('blogPostTitleUnsaved') }).catch(function (error) {
      Bert.alert(error.reason, 'danger');
    }); 
  },
  'click #previewButton': function (event) {
    event.preventDefault();
    window.open(FlowRouter.path('blog-preview', { _id: FlowRouter.getParam('_id') }), 'preview');
  }
});
