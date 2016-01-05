Template.addNewBlogPostModal.onRendered(function () {
  $("#new-blog-post").validate({
    rules: {
      blogPostTitle: {
        required: true
      }
    },
    messages: {
      blogPostTitle: {
        required: "Woah there, slick. Add a title please."
      }
    },
    submitHandler: function() {
      var title = $("[name='blogPostTitle']").val();

      Meteor.call('insertBlogPost', { title: title }, function(error, response) {
        if (error) {
          Bert.alert(error.reason, "danger");
        } else {
          FlowRouter.go("editor-blog-post", { _id: response._id });
          $('#new-blog-post-modal').modal('hide');
          $('.modal-backdrop').remove();
        }
      });
    }
  });
});

Template.addNewBlogPostModal.events({
  'submit form': function(e) {
    e.preventDefault();
  }
});
