module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner:
      '<%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>); © <%= pkg.author %> - <%= pkg.license %>',
    dzpath: "/static/retrotxt",
    uglify: {
      options: {
        footer: "\n/*! <%= banner %> */\n",
      },
      build: {
        files: {
          "dist/js/retrotxt.js": ["js/retrotxt.js"],
          "dist/js/retrotxt-init.js": ["js/retrotxt-init.js"],
          "dist/js/module/charset.js": ["js/module/charset.js"],
          "dist/js/module/text.js": ["js/module/text.js"],
        },
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ["font/amigafonts_v1.02/**"],
            dest: "dist",
          },
          {
            expand: true,
            src: ["font/oldschool_pc_­font_pack_v2.2/**"],
            dest: "dist",
          },
        ],
      },
      examples: {
        files: [
          {
            expand: true,
            src: ["example/**"],
            dest: "dist/",
          },
          { src: "example*.html", dest: "dist/" },
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
            dest: "dist/css/retrotxt.css",
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
          src: ["dist/css/retrotxt.css"],
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
          base: ["dist"],
          open: {
            target: "http://localhost:8002/example1.html",
          },
          keepalive: true,
        },
      },
    },
    clean: {
      build: {
        src: ["dist"],
      },
    },
    replace: {
      init: {
        src: ["dist/js/retrotxt-init.js"],
        dest: ["dist/js/retrotxt-init.js"],
        replacements: [
          {
            from: 'src="/js/retrotxt.js"',
            to: 'src="<%= dzpath %>/js/retrotxt.js"',
          },
        ],
      },
      css: {
        src: ["dist/js/retrotxt.js"],
        dest: ["dist/js/retrotxt.js"],
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
