import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
)), {
    plugins: {
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    settings: {
        "import/resolver": {
            typescript: {}
        }
    },


    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
    },

    rules: {
        "no-debugger": "off",
        "no-console": 0,
        "class-methods-use-this": "off",
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/no-require-imports": "off",
        "prettier/prettier": "error",
        "import/no-unresolved": "error",
    },
}];