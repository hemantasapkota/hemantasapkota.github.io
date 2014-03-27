
module.exports = function(Settings) {
  Settings.property('disqus', {
    forumShortname: String
  });
  return Settings;
};

module.exports.__module = {
  args: ['data/models/Settings']
};
