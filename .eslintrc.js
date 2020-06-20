module.exports = {
  'env': {
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'no-unused-vars': 0,
    'semi': ['error', 'never'],
    'require-jsdoc': 0,
    'indent': ['error', 4],
    'max-len': ['error', {"code": 120}]
  },
};
