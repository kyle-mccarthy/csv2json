const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    '@typescript-eslint',
  ],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
};

module.exports = config;
