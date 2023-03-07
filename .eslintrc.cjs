module.exports = {
  "env": {"browser": true},
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:solid/typescript",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {"project": ["./tsconfig.json"]},
  "plugins": ["@typescript-eslint", "solid", "prettier", "import"],
  "rules": {
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never",
    }],
    "prettier/prettier": ["error", {"endOfLine": "auto"}],
    "import/prefer-default-export": "off",
    "solid/no-destructure": "off"
  },
  overrides: [
    {
      files: ['./**/*.test.{ts,tsx,js,jsx'],
      rules: {
        "@typescript-eslint/unbound-method": "off"
      }
    }
    ]
}
