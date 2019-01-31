module.exports = {
  extends: 'airbnb',

  plugins: [],
  extends: 'eslint:recommended',

  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    semi: ['error', 'always']
  },

  parserOptions: {
    ecmaVersion: 2017
  },

  env: {
    node: true,
    es6: true,
    commonjs: true,
    browser: true,
    amd: true
  }
};
