// eslint.config.mjs
// ESLint flat configuration for JavaScript and JavaScript modules.
import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: [
      "Gruntfile.js", // Grunt task runner
      "js/retrotxt-init.js", // ES2015+ feature detection
      "test/retrotxt.js", // QUnit tests
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "test/**/*"],
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: {
      //noInlineConfig: false,
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      "no-useless-assignment": "error",
      "require-atomic-updates": "error",
      "accessor-pairs": "warn",
      "symbol-description": "warn",
      "no-eval": "error",
      "no-empty-function": "warn",
      "no-empty": "warn",
      "no-else-return": "warn",
      "no-bitwise": "warn",
      "no-var": "warn",
      "no-undefined": "warn",
      "no-undef-init": "warn",
      "no-useless-constructor": "warn",
      "no-useless-concat": "warn",
      "no-useless-computed-key": "warn",
      "no-unneeded-ternary": "warn",
      "prefer-template": "warn",
      "prefer-spread": "warn",
      "prefer-rest-params": "warn",
      "prefer-const": "warn",
      "prefer-arrow-callback": "warn",
      "operator-assignment": "warn",
      "no-throw-literal": "warn",
      "no-script-url": "warn",
      "no-return-assign": "warn",
      "no-proto": "warn",
      "no-param-reassign": "warn",
      "no-octal-escape": "warn",
      "no-object-constructor": "warn",
      "no-new-wrappers": "warn",
      "no-new-func": "warn",
      "no-new": "warn",
      "no-nested-ternary": "warn",
      "no-negated-condition": "warn",
      "no-multi-assign": "warn",
      "no-magic-numbers": "warn",
      "no-loop-func": "warn",
      "no-lonely-if": "warn",
      "no-implied-eval": "warn",
      "no-implicit-globals": "warn",
      "no-implicit-coercion": "warn",
      "default-case-last": "warn",
      "dot-notation": "warn",
      eqeqeq: "warn",
      "no-extend-native": "error",
    },
  },
];
