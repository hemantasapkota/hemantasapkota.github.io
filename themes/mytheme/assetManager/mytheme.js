

module.exports = {
  __module: {
    provides: {
      "assetManager/use_scripts": {},
      "assetManager/use_stylesheets": {},
      "assetManager/register_assets_dir": {
        after: ['assetManager/bootstrap', 'assetManager/hadron', 'assetManager/hadron-theme-nodus']
      },
      "assetManager/register_views_dir": {
        after: ['assetManager/bootstrap', 'assetManager/hadron', 'assetManager/hadron-theme-nodus']
      }
    }
  },

  register_assets_dir: function() {
    return __dirname + "/../assets";
  },

  register_views_dir: function() {
    return __dirname + "/../views";
  },

  use_scripts: function() {
    return {};
  },

  use_stylesheets: function() {
    return {};
  }
};