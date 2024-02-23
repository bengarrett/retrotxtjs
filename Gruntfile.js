module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner:
      '<%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>); © <%= pkg.author %> - <%= pkg.license %>',
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
            flatten: true,
            src: ["font/amigafonts_v1.02/*"],
            dest: "dist/font/amiga/",
          },
          {
            expand: true,
            flatten: true,
            src: ["font/oldschool_pc_­font_pack_v2.2/*"],
            dest: "dist/font/pc/",
          },
        ],
      },
      example: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ["example/*"],
            dest: "dist/",
          },
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
        overrideConfigFile: ".eslintrc.js",
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
    },
    clean: {
      build: {
        src: ["dist"],
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

  // Default task(s).
  grunt.registerTask("default", [
    "clean",
    "uglify",
    "copy:main",
    "copy:example",
    "cssmin",
    "usebanner",
  ]);

  // Lint source code.
  grunt.registerTask("lint", ["eslint", "stylelint"]);

  // JS unit tests.
  grunt.registerTask("test", ["connect:server", "qunit"]);
};
