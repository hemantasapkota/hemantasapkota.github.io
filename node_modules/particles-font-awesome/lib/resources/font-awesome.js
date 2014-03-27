
module.exports = {
  __module: {
    provides: ["resources/register_assets_dir"]
  },

  exports: {
    stylesheets: {
      all: "lib/font-awesome/css/font-awesome.css"
    }
  },

  register_assets_dir: function() {
    return __dirname + "/../../assets";
  }
};