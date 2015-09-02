module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/iconsRaw',
            src: '*.svg',
            dest: 'src/iconsOpt',
            ext: '.svg'
          }
        ]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },

    webfont: {
      icons: {
        src: 'src/iconsOpt/*.svg',
        dest: 'fonts',
        destCss: 'css',
        options: {
          font: 'dnnicon',
          engine: 'node',
          destHtml: 'docs',
          types: 'eot,woff,ttf,svg',
          order: 'eot,woff2,woff,ttf,svg',
          syntax: 'bem',
          templateOptions: {
            baseClass: 'dnni',
            classPrefix: 'dnni-'
          },
          htmlDemoTemplate: 'templates/demo.html'
        }
      }
    }
  });

  // Load the task plugins.
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-webfont');

  // Default task(s).
  grunt.registerTask('default', ['svgmin', 'webfont', 'cssmin']);

};