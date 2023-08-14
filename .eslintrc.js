module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
};
