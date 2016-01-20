Comments = new Mongo.Collection('comments');

Comments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Comments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

var commentFields = {
  discussion_id: {
    type: String,
    index: 1
  },
  parent_id: {
    type: String,
    optional: true,
    index: 1
  },
  slug: {
    type: String,
    index: 1
  },
  full_slug: {
    type: String,
    index: 1
  },
  posted: {
    type: Date,
    denyUpdate: true
  },
  user_id: {
    type: String,
    index: 1
  },
  markdown: {
    type: String
  },
  rendered: {
    type: String
  }
};
var commentschema = new SimpleSchema(commentFields);

Comments.attachSchema(commentschema);
