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

{
    _id: ObjectId(...),
    discussion_id: ObjectId(...),
    parent_id: ObjectId(...),
    slug: '34db/8bda'
    full_slug: '2012.02.08.12.21.08:34db/2012.02.09.22.19.16:8bda',
    posted: ISODateTime(...),
    author: {
              id: ObjectId(...),
              name: 'Rick'
             },
    text: 'This is so bogus ... '
}

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
