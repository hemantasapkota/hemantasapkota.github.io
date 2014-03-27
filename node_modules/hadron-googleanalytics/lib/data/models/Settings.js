
module.exports = function(Settings) {
  Settings.property('googleanalytics', {
    trackingCode: String
  });
  return Settings;
};

module.exports.__module = {
  args: ['data/models/Settings']
};
