Meteor.publish('allPosts', function (){
  return BlogPosts.find();
});

Meteor.publish('singlePost', function (id){
  check(id, String);
  return BlogPosts.find(id);
});

Meteor.publish('latestPost', function (){
  return BlogPosts.find({}, { sort: { createdAt: -1 }, limit: 1 });
});
