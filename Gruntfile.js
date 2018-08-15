module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      mainJSDev: {
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
      mainJSProduction: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "desktop": "main"
          },
          wrap: true,
          name: "libs/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/main.js",
          include: ["desktop"],
          out: "public/dist/main.min.js"
        }
      },
      mainCssProduction: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/dist/app.css",
          out: "./public/dist/app.min.css"
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
          'public/dist/app.css' : 'public/scss/app.scss'
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
        tasks:['requirejs:mainJSDev']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['requirejs:mainJSDev', 'sass']);
  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('production', ['requirejs:mainJSProduction', 'sass', 'requirejs:mainCssProduction']);
};