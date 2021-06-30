module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner:
      '<%= pkg.description %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>); © <%= pkg.author %> - <%= pkg.license %>',
    dzpath: "/static/retrotxt",
    uglify: {
      options: {
        footer: "\n/*! <%= banner %> */\n",
      },
      build: {
        files: {
          "build/js/retrotxt.js": ["js/retrotxt.js"],
          "build/js/retrotxt-init.js": ["js/retrotxt-init.js"],
          "build/js/module/charset.js": ["js/module/charset.js"],
          "build/js/module/text.js": ["js/module/text.js"],
        },
      },
    },
    copy: {
      main: {
        files: [{ expand: true, src: ["font/**"], dest: "build/" }],
      },
      examples: {
        files: [
          {
            expand: true,
            src: ["Text ad for Street Spydrs RAZOR.WHQ - Demozoo_files/**"],
            dest: "build/",
          },
          { src: "example*.html", dest: "build/" },
        ],
      },
    },
    cssmin: {
      options: {
        level: 2,
      },
      target: {
        files: [
          {
            src: ["css/retrotxt.css"],
            dest: "build/css/retrotxt.css",
          },
        ],
      },
    },
    usebanner: {
      taskName: {
        options: {
          position: "bottom",
          banner:
            "/*! <%= banner %>\n    VGA 8x16 fonts © VileR; TopazPlus fonts © dMG/t!s^dS! */\n",
          linebreak: true,
        },
        files: {
          src: ["build/css/retrotxt.css"],
        },
      },
    },
    eslint: {
      options: {
        configFile: ".eslintrc.js",
      },
      target: ["js/**.js", "js/module/**.js"],
    },
    stylelint: {
      options: {
        fix: true,
      },
      src: ["css/**/*.css"],
    },
    // Due to CORS and the use of modules, tests must be run on a live server.
    qunit: {
      all: {
        options: {
          urls: ["http://localhost:8001/test/test.html"],
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 8001,
          base: ".",
        },
      },
      examples: {
        options: {
          port: 8002,
          base: ["build"],
          open: {
            target: "http://localhost:8002/example1.html",
          },
          keepalive: true,
        },
      },
    },
    clean: {
      build: {
        src: ["build"],
      },
    },
    replace: {
      init: {
        src: ["build/js/retrotxt-init.js"],
        dest: ["build/js/retrotxt-init.js"],
        replacements: [
          {
            from: 'src="/js/retrotxt.js"',
            to: 'src="<%= dzpath %>/js/retrotxt.js"',
          },
        ],
      },
      css: {
        src: ["build/js/retrotxt.js"],
        dest: ["build/js/retrotxt.js"],
        replacements: [
          {
            from: '"../css/retrotxt.css"',
            to: '"<%= dzpath %>/css/retrotxt.css"',
          },
        ],
      },
    },
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-stylelint");
  grunt.loadNpmTasks("grunt-banner");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-text-replace");

  // Default task(s).
  grunt.registerTask("default", [
    "clean",
    "uglify",
    "copy:main",
    "cssmin",
    "usebanner",
  ]);

  // Lint source code.
  grunt.registerTask("lint", ["eslint", "stylelint"]);

  // JS unit tests.
  grunt.registerTask("test", ["connect:server", "qunit"]);

  // Run the examples files in a browser with the build code.
  grunt.registerTask("example", [
    "default",
    "copy:examples",
    "connect:examples",
  ]);

  // Deploy for Demozoo.
  grunt.registerTask("deploy", ["default", "replace:init", "replace:css"]);
};
