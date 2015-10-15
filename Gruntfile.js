'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    processhtml: {
      build: {
        files: {
          'build/index.html': ['public/index.html']
        }
      }
    },

    //this one isn't used because there are only images as assets and they are included in css as base64
    copy: {
      build: {
        files:[
          {expand: true, cwd: 'public/', src: ['**'], dest: 'build/'},
        ]
      }
    },

    connect: {
      build: {
        options: {
          port: 9001,
          base: 'build',
          open: true,
          keepalive: true
        }
      }
    }

  });

  grunt.registerTask('build',[
    'processhtml:build'
  ]);

  grunt.registerTask('serve', function(target){
    if(target === 'build'){
      grunt.task.run('connect:build');
    }
  });

}