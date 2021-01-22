module.exports = {
  'root':true,
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:vue/base',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser':'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'ecmaFeatures': {
      'jsx': true
    },
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    "array-bracket-spacing":['error','never'],
    'comma-spacing':['error',{'before':false,'after':true}],
    'space-infix-ops':['error',{'int32Hint':true}],
    '@typescript-eslint/no-var-requires':'off'
  },
  'globals':{
    'IS_DEV':'readonly',
  }
};
