module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    quotes: [2, 'single', {avoidEscape: true}],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off',
        'no-undef': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 0,
      },
    },
  ],
};
