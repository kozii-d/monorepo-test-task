module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "plugins": [
    "@typescript-eslint",
    "eslint-plugin-import-helpers"
  ],
  "rules": {
    indent: [2, 2],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "object-curly-spacing": [1, "always"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
    }],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        alphabetize: {
          order: "asc",
          ignoreCase: false,
        },
        groups: [
          "/^(path|fs|util|os|http|https|net|events|child_process|crypto)$/",
          "/^@prisma/",
          "/^express/",
          "/^@apollo/",
          "/^dotenv/",
          "module",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
  }
};
