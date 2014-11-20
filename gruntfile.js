
module.exports = function (grunt) {

  grunt.initConfig({

    jshint : {
      all : ['lib/*']
    },

    concat : {
      dist : {
        src : ['public/scripts/modules/boards/controllers/*'],
        dest : 'merged.js'
      }
    },

    uglify : {
      dist : {
        src : 'merged.js',
        dest : 'merged.min.js'
      }
    },

    shell : {
      prepareDatabase : {
        command: 'export NODE_ENV=test && node ../cerberus-api/build/setupDb.js test-sql'
      },
      runProtractor : {
        command: 'protractor test/protractor/config.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask(
    'default',
    [
      'jshint',
      'concat',
      'uglify'
    ]
  );

  grunt.registerTask(
    'build',
    [

    ]
  );

  grunt.registerTask(
    'test',
    [
      'shell:prepareDatabase',
      'shell:runProtractor'
    ]
  );
}
