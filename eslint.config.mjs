import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [
      "webpack.*.js",
      ".prettierignore",
      ".prettierrc",
      "eslint.config.mjs",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];
