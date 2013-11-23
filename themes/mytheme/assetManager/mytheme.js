

module.exports = {
  __module: {
    provides: {
      use_scripts: {},
      use_stylesheets: {},
      register_assets_dir: {after: ['assetManager/bootstrap', 'assetManager/hadron', 'assetManager/hadron-theme-nodus']},
      register_views_dir: {after: ['assetManager/bootstrap', 'assetManager/hadron', 'assetManager/hadron-theme-nodus']}
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