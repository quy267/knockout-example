var path = require('path');
var webpack = require('webpack');

/*global module:false*/
module.exports = function (grunt) {
	var componentloader = require('./componentloader.js');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      options: {
        force: true
      },
      build: ['dist/**/*', 'sass-compile/**/*']
    },
    concat: {
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/materialize/dist/js/materialize.js',
          'bower_components/knockout/dist/knockout.debug.js',
          'bower_components/crypto-js/crypto-js.js',
          'bower_components/google-fastbutton/google.fastbutton.js',
          'bower_components/google-fastbutton/jquery.google.fastbutton.js',
          'bower_components/materialize-clockpicker/dist/js/materialize.clockpicker.js',
          'bower_components/knockout-router/dist/knockout-router.js',
        ],
        dest: 'dist/script/vender.js'
      },
      css: {
        src: [
          'bower_components/materialize-clockpicker/dist/css/materialize.clockpicker.css',
          'dist/style/ontweb2-ws.css',
          'src/css/*'
        ],
        dest: 'dist/style/style.css'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/material-design-icons/iconfont/',
            src: ['MaterialIcons-Regular.*'],
            dest: 'dist/fonts/',
            extDot: 'first'
          },
          {
            expand: true,
            cwd: 'bower_components/materialize/dist/font/',
            src: ['**/*.*'],
            dest: 'dist/fonts/',
            extDot: 'first'
          },
          {
            expand: true,
            cwd: 'bower_components/materialize/sass/',
            src: ['**/*.scss'],
            dest: 'sass-compile/src/materialize/',
            ext: '.scss',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'src/style/',
            src: ['**/*.scss'],
            dest: 'sass-compile/src/',
            ext: '.scss',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'src/script/',
            src: ['all.componentmodel.js'],
            dest: 'dist/script/'
          },
          {
            expand: true,
            cwd: 'src/www/',
            src: ['**/*.jpg', '**/*.png'],
            dest: 'dist/',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'src/style/fonts/',
            src: ['*'],
            dest: 'dist/fonts/',
            extDot: 'last'
          }
        ]
      },
      style: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/material-design-icons/iconfont/',
            src: ['MaterialIcons-Regular.*'],
            dest: 'dist/fonts/',
            extDot: 'first'
          },
          {
            expand: true,
            cwd: 'bower_components/materialize/dist/font/',
            src: ['**/*.*'],
            dest: 'dist/fonts/',
            extDot: 'first'
          },
          {
            expand: true,
            cwd: 'bower_components/materialize/sass/',
            src: ['**/*.scss'],
            dest: 'sass-compile/src/materialize/',
            ext: '.scss',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'src/style/',
            src: ['**/*.scss'],
            dest: 'sass-compile/src/',
            ext: '.scss',
            extDot: 'last'
          }
        ]
      },
      quick: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/materialize/sass/',
            src: ['**/*.scss'],
            dest: 'sass-compile/src/materialize/',
            ext: '.scss',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'src/style/',
            src: ['**/*.scss'],
            dest: 'sass-compile/src/',
            ext: '.scss',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'depends/',
            src: ['**/*.*'],
            dest: 'dist/',
            extDot: 'first'
          },
          {
            expand: true,
            cwd: 'src/style/fonts/',
            src: ['*'],
            dest: 'dist/fonts/',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'src/www/',
            src: ['**/*.jpg', '**/*.png'],
            dest: 'dist/',
            extDot: 'last'
          }
        ]
      },
      depends: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.*'],
            dest: 'depends/',
            extDot: 'first'
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/script/ts.js': 'dist/script/ts.js',
          'dist/script/vender.js': 'dist/script/vender.js',
          'dist/script/all.componentmodel.js': 'dist/script/all.componentmodel.js'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src/www',
          src: ['**/*.html'],
          dest: 'dist',
          ext: '.html',
          extDot: 'first'
        }]
      }
    },
    concurrent: {
      target: {
        tasks: ['dev', 'webpack:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    webpack: {
      options: {
        output: {
          path: './dist/script/',
          filename: '[name].js'
        },

        module: {
          loaders: [
            { test: /\.html$/, loader: 'html' },
            { test: /\.js$/, loader: 'strict!jshint' },
            { test: /\.json$/, loader: 'json' }
          ]
        },

        resolve: {
          root: path.join(__dirname, './src/script')
        },
        externals: [
          {
            'jquery': 'jQuery',
            'ko': 'ko',
            'core': 'core',
            // 'WfChart': 'WfChart',
            // 'WfCandleData': 'WfCandleData',
            'router': 'ko_router',
            'application': 'application',
            'crypto': 'CryptoJS'
          }
        ]
      },
      dev: {
        failOnError: false,
        watch: true,
        keepalive: true,

        entry: {
          ts: 'ts.js'
        }
      },
      build: {
        entry: {
          ts: 'ts.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8100,
          base: 'dist'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    sass: {
      ontweb2: {
        files: {
          'dist/style/ontweb2-black-small.css': 'sass-compile/src/materialize/base/ontweb2-bs.scss',
          'dist/style/ontweb2-black-medium.css': 'sass-compile/src/materialize/base/ontweb2-bm.scss',
          'dist/style/ontweb2-black-big.css': 'sass-compile/src/materialize/base/ontweb2-bb.scss',
          'dist/style/ontweb2-black2-small.css': 'sass-compile/src/materialize/base/ontweb2-b2s.scss',
          'dist/style/ontweb2-black2-medium.css': 'sass-compile/src/materialize/base/ontweb2-b2m.scss',
          'dist/style/ontweb2-black2-big.css': 'sass-compile/src/materialize/base/ontweb2-b2b.scss',
          'dist/style/ontweb2-ws.css': 'sass-compile/src/materialize/base/ontweb2-ws.scss',
          'dist/style/ontweb2-white-medium.css': 'sass-compile/src/materialize/base/ontweb2-wm.scss',
          'dist/style/ontweb2-white-big.css': 'sass-compile/src/materialize/base/ontweb2-wb.scss',
          'dist/style/ontweb2-white2-small.css': 'sass-compile/src/materialize/base/ontweb2-w2s.scss',
          'dist/style/ontweb2-white2-medium.css': 'sass-compile/src/materialize/base/ontweb2-w2m.scss',
          'dist/style/ontweb2-white2-big.css': 'sass-compile/src/materialize/base/ontweb2-w2b.scss'
        }
      }
    },
    'file-creator': {
			basic: {
				'./src/script/componentloader.js': function(fs, fd, done) {
					fs.writeSync(fd, componentloader.load());
					done();
				}
			}
		},
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      www: {
        files: ['src/www/index.html', 'src/www/**/*.html'],
        tasks: ['htmlmin']
      },
      scss: {
        files: ['src/style/**/*.scss'],
        tasks: ['copy:style', 'sass',]
      },
      js: {
        files: ['src/style/**/*.js'],
        tasks: ['file-creator']
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['concat']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-file-creator');

  // Default task.
  grunt.registerTask('default', ['file-creator','concurrent']);
  grunt.registerTask('dev', ['clean', 'copy:main', 'htmlmin', 'sass', 'concat', 'connect', 'watch']);

};
