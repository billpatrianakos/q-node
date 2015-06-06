/**
 * Gruntfile.js
 *
 * Development and build tasks for
 * the QClient module.
 */

module.exports = function(grunt) {
  var hashFiles = require('hash-files');

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: {
      name: '<%= pkg.name %>',
      version: '<%= pkg.version %>',
      codeName: 'Yesterday',
      build: '<%= grunt.template.today("yyyymmdd") %>',
      signature: hashFiles({ files: ['./**/*'], algorithm: 'md5' }, function(err, hash) {
        if (err) return 'ERROR';
        return hash;
      })
    },

    // watch
    watch: {
      options: {
        reload: true,
        debounceDelay: 250
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint']
      }
    },

    // jshint
    jshint: {
      all: ['**/*.js', '!node_modules/**/*']
    },

    // todos
    todos: {
      options: {
        verbose: false
      },
      all: {
        src: ['README.md', 'Gruntfile.js', 'qclient.js']
      }
    }
  });

  grunt.registerTask('default', 'develop');
  grunt.registerTask('develop', ['todos', 'watch']);
  grunt.registerTask('codesign', function() {console.log('Code to add signature to README will go here.');});
};
