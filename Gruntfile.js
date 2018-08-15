module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      mainJS: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "desktop": "main"
          },
          wrap: true,
          name: "libs/almond",
          preserveLicenseComments: false,
          optimize: "none",
          mainConfigFile: "public/js/main.js",
          include: ["desktop"],
          out: "public/dist/main.js"
        }
      },
      mainCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/css/app.css",
          out: "./public/app.min.css"
        }
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'expanded'
        },
        files: {
          'public/dist/app.css' : 'public/css/app.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      js: {
        files:['public/js/**'],
        tasks:['requirejs:mainJS']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['requirejs:mainJS','sass', 'watch']);
};