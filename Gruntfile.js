module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      mainJS: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "desktop": "index"
          },
          wrap: true,
          name: "libs/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/index.js",
          include: ["desktop"],
          out: "public/js/index.min.js"
        }
      },
      mainCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/css/app.css",
          out: "./public/app.min.css"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['requirejs:mainJS', 'requirejs:mainCSS']);
};