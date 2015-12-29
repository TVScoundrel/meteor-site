const initEditor = function( template ) {
  Tracker.autorun( function( computation ) {
    var doc = BlogPosts.findOne( {}, { fields: { "body": 1 } } );

    if ( doc && doc.body ) {

      Meteor.call( "convertMarkdown", doc.body, function( error, html ) {
        if ( error ) {
          console.log( error.reason );
        } else {
          $( "#preview" ).html( html );
        }
      });

      template.editor.setValue( doc.body.trim() );

      computation.stop();
    }
  });
};

Template.editBlogPost.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var _id = FlowRouter.getParam('_id');
    self.subscribe('singlePost', _id);
  });
});

Template.editBlogPost.onRendered( function() {
  this.docId = FlowRouter.getParam('_id');
  
  this.editor = CodeMirror.fromTextArea( this.find( "#editor" ), {
    lineNumbers: true,
    fixedGutter: false,
    mode: "markdown",
    lineWrapping: false,
    cursorHeight: 0.85
  });
  
  initEditor(this);
});

Template.editBlogPost.helpers({
  blogPost: function(){
    var getBlogPost = BlogPosts.findOne();

    if ( getBlogPost ) {
      return getBlogPost;
    }
  },
  saving: function() {
    var saveState = Template.instance().saveState.get();
    return saveState;
  }
});

Template.editBlogPost.events({
  'keyup .CodeMirror': function(event, template) {
    var text = template.editor.getValue();
    if ( text !== "" ) {
      Meteor.callPromise( "convertMarkdown", text )
        .then( function( html ) {
          $( "#preview" ).html( html );
          return Meteor.callPromise( "updateBlogPost", { _id: template.docId, body: text } );
        })
        .catch( function( error ) {
          Bert.alert( error.reason, "danger" );
        });
    }
  }
});
