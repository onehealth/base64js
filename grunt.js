module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg    : '<json:package.json>',
    meta   : {
      banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    concat: {
      dist: {
        src  : ['<banner:meta.banner>', 'src/base64.js'],
        dest : 'dist/base64.js'
      }
    },
    min    : {
      dist: {
        src  : ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest : 'dist/base64.min.js'
      }
    },
    lint   : {
      src   : 'src/**/*.js',
      tests : [
        'spec/**/*Spec.js'
      ]
    },
    jshint : {
      options : {
        curly   : true,
        eqeqeq  : true,
        immed   : true,
        latedef : true,
        newcap  : true,
        noarg   : true,
        sub     : true,
        undef   : true,
        boss    : true,
        eqnull  : true,
        node    : true,
        es5     : true
      },
      globals : {
        window : false,
        jQuery : false
      },
      grunt   : {
        options : {node : true},
        globals : {
          task     : true,
          config   : true,
          file     : true,
          log      : true,
          template : true
        }
      },
      src     : {
        options : {unused : false}
      },
      tests   : {
        globals : {
          window    : false,
          jasmine    : false,
          describe   : false,
          beforeEach : false,
          expect     : false,
          it         : false,
          spyOn      : false,
          xit        : false
        }
      }
    },
    open : {
      dev : {
        url : 'http://127.0.0.1:8000/example/'
      }
    },
    watch            : {
      files : ['<config:jasmine.specs>', 'src/*js'],
      tasks : 'jasmine'
    },
    jasmine          : {
      src     : [
        'vendor/underscore.js',
        'src/base64.js'
      ],
      helpers : 'spec/helpers/*.js',
      specs   : [
        'spec/**/*Spec.js'
      ],
      timeout : 10000,
      server : {
        port : 2000
      }

    },
    'jasmine-server' : {
      browser : true
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-open');

  // Default task.
  grunt.registerTask('default', 'test');
  grunt.registerTask('dev', 'server open:dev watch');
  grunt.registerTask('test', 'lint jasmine');
  grunt.registerTask('test-web', 'jasmine-server');
  grunt.registerTask('build', 'test concat min');

  grunt.registerTask('build-notest', 'lint concat min');

};
