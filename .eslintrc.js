module.exports = {
  extends: [
    'node-moar',
  ],
  plugins: [
    'jest',
    'fp',
    'unicorn',
  ],
  overrides: [
    {
      files: ['**/src/**'],
      extends: [
        'node-moar-stricter',
      ],
      rules: {
        'unicorn/prefer-top-level-await': 'off',
        // 'unicorn/no-array-reduce': 'off',
        'security/detect-non-literal-fs-filename': 'off',
      },
    },
    {
      files: [
        '**/tests/**',
        '**/fixtures/**',
        '.eslintrc.js',
        'jest.config.js',
        'jest.config.*.js',
      ],
      extends: [
        'node-moar-test',
      ],
    },
  ],
}
