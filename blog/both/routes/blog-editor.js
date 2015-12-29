const addEditorView = function () {
  $('body').addClass("editor-view");
}

const removeEditorView = function () {
  $('body').removeClass("editor-view");
}

const blogEditorRoutes = FlowRouter.group({
  name: 'blog-editor',
  authentication: {
    requireLoggedIn: true,
    redirectPath: '/login',
    roles: ['super-admin', 'blog-editor']
  }
});

blogEditorRoutes.route('/editor-blog-posts', {
  name: 'editor-blog-posts',
  action() {
    BlazeLayout.render('default', { yield: 'editorBlogPosts' });
  }
});

blogEditorRoutes.route('/editor-blog-posts/:_id', {
  name: 'editor-blog-post',
  triggersEnter: [addEditorView],
  triggersExit: [removeEditorView],
  action() {
    BlazeLayout.render('default', { yield: 'editBlogPost' });
  }
});
