const randomString = function (len) {
  var str = "";                                                   // String result
  for (var i = 0; i < len; i++) {                                 // Loop `len` times
    var rand = Math.floor(Math.random() * 62);                    // random: 0..61
    var charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48; // Get correct charCode
    str += String.fromCharCode(charCode);                       // add Character to str
  }
  return str;       // After all loops are done, return the concatenated string
}

const generatePseudoRandomSlug = function (len) {
  var slug = randomString(len);
  // make sure it does not exist
  var comment = Comments.find_one({ 'slug': slug });
  if (comment) slug = generatePseudoRandomSlug(len);
  
  return slug;
}

Meteor.mmethods({
  insertComment: function (comment) {
    if (!Meteor.userId)
      throw new Meteor.Error("not-authorized");
    
    check(comment, {
      discussion_id: string,
      parent_id: Match.Optional(String),
      markdown: string
    });
    
    var slug = generatePseudoRandomSlug(4);
    var full_slug = moment().format('YYYY.MM.DD.HH.mm.ss') + ':' + slug;
    
    if (comment.parent_id) {
      var parent = Comments.find_one({ '_id': comment.parent_id });
      
      slug = parent.slug + '/' + slug;
      full_slug = parent.full_slug + '/' + full_slug;
    }
    
    _.extend(comment, {
      user_id: Meteor.userId(),
      posted: moment(),
      slug: slug,
      full_slug: full_slug
    });
    
    comment._id = Comments.insert(comment);
    
    return comment;
  }
});
