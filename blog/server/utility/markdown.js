Meteor.methods({
  convertMarkdown: function( markdown ){
    check( markdown, String );
    var Remarkable = Meteor.npmRequire('remarkable');
    var hljs = Meteor.npmRequire('highlight.js');
    var md = new Remarkable({
      html: true,
      breaks: true,
      langPrefix: 'hljs language-',
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}

        return ''; // use external default escaping
      }
    });
    return md.render( markdown );
  }
});
