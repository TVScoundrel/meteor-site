BlogPosts = new Mongo.Collection('blogPosts');

var blogPostFields = {
  title: {
    type: String
  },
  body: {
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
