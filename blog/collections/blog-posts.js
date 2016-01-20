BlogPosts = new Mongo.Collection('blogPosts');

BlogPosts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

BlogPosts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

var blogPostFields = {
  title: {
    type: String
  },
  titleUnsaved: {
    type: String
  },
  body: {
    type: String,
    optional: true
  },
  bodyUnsaved: {
    type: String,
    optional:true
  },
  rendered: {
    type: String,
    optional: true
  },
  renderedUnsaved: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  author: {
    type: Object
  },
  createdAt: {
    type: Date,
    optional: true
  },
  lastEditAt: {
    type: Date,
    optional: true
  }
};
var BlogPostSchema = new SimpleSchema(blogPostFields);

BlogPosts.attachSchema(BlogPostSchema);
