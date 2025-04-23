import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: pluginImport,
      "@typescript-eslint": tseslint.plugin,
      unicorn: unicorn,
    },
    rules: {
      "no-console": "off", //"error",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],
      "quote-props": ["error", "as-needed"],
      "no-unused-vars": "off",
      "no-restricted-syntax": ["error", "WithStatement", "DebuggerStatement"],
      "no-param-reassign": "error",
      camelcase: "error",
      "max-len": ["error", { code: 100, ignoreUrls: true }],

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-shadow": "error",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      "prettier/prettier": "error",

      ...unicorn.configs.recommended.rules,
      "unicorn/no-for-loop": "off",
      "@typescript-eslint/prefer-for-of": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/no-array-reduce": "error",
      "unicorn/prefer-array-some": "error",
      "max-lines-per-function": [
        "error",
        { max: 40, skipBlankLines: false, skipComments: false },
      ],
    },
    noInlineConfig: true,
  },
  ...tseslint.configs.recommended,
  {
    ignores: ["**/*.config.js"],
  },
]);
