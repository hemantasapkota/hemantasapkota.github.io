
module.exports = {
  __module: {
    provides: ["resources/register_assets_dir"]
  },

  exports: {
    scripts: {
      all: "lib/angular/angular.js"
    }
  },

  register_assets_dir: function() {
    return __dirname + "/../../assets";
  }
};