Meteor.publish('allPosts', function (){
  return BlogPosts.find();
});

Meteor.publish('singlePost', function (id){
  check(id, String);
  return BlogPosts.find(id);
});