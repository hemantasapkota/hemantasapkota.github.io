'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    particles: {
      build: {
        options: {
          appRoot: __dirname,
          runServices: ['svc|sequence!grunt/configure_grunt']
        }
      },
      install: {
        options: {
          appRoot: __dirname,
          runServices: ['svc|sequence!install/install']
        }
      }
    }
  });

  //Auto load grunt plugins.
  require('glob').sync("grunt-*", {cwd: 'node_modules'}).filter(function(name) {
    return name !== "grunt" && name !== "grunt-cli";
  }).forEach(grunt.loadNpmTasks);


  grunt.registerTask('update', ['particles:build', 'particles-update']);
  grunt.registerTask('build', ['particles:build', 'particles-build']);
  grunt.registerTask('build-and-watch', ['particles:build', 'particles-build-and-watch']);
  grunt.registerTask('install', ['particles:install']);
  grunt.registerTask('dev', ['particles:build', 'particles-develop']);

  grunt.registerTask('default', ['build']);
};
