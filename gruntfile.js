
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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
}
