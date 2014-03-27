var gulpAngularExtender = require('gulp-angular-extender'),
  gutil = require('gulp-util'),
  glob = require('glob'),
  filter = require('gulp-filter');
  
var _ = {
  uniq: require('lodash.uniq'),
  compact: require('lodash.compact'),
  flatten: require('lodash.flatten')
};

var self = module.exports = {
  __module: {
    properties: {
      promises: 'utils/promises',
      declare_angular_scripts: 'svc|sequence!resources/declare_angular_scripts',
      extend_angular_modules: 'svc|sequence!resources/extend_angular_modules'
    },
    provides: {"assetmanager/build/transforms/define_transforms": {before: ["./dest", "./inject"]}}
  },

  define_transforms: function(definitions) {
    return self.promises.all([
      self.declare_angular_scripts(),
      self.extend_angular_modules()
    ])
      .spread(function(scripts, modules) {
        scripts = _.compact(_.flatten(scripts, true));
        var expandedScripts = [];
        //expand globs
        scripts.forEach(function(script) {
          if(typeof script === 'string') {
            expandedScripts.push(script);
          } else {
            Array.prototype.push.apply(expandedScripts, 
              glob.sync(script.file, {cwd: script.cwd}));
          }
        });
        
        modules = _.compact(modules, true);
        var normalizedExtensions = {};
        modules.forEach(function(modules) {
          Object.keys(modules).forEach(function(extendedModule) {
            var extendingModules = modules[extendedModule];
            if(!normalizedExtensions[extendedModule]) {
              normalizedExtensions[extendedModule] = extendingModules;
            } else {
              Array.prototype.push.apply(normalizedExtensions[extendedModule], extendingModules);
              normalizedExtensions[extendedModule] = _.uniq(normalizedExtensions[extendedModule]);
            }
          });
        });
        
        var jsFilter = filter(expandedScripts);
        definitions.streams.assets.push(
          jsFilter,
          gulpAngularExtender(normalizedExtensions),
          jsFilter.restore()
        );
        
        return definitions;
      });
  }
};

