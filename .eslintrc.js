module.exports = {
  extends: [
    'node-moar',
  ],
  plugins: [
    'jest',
    'fp',
    'unicorn',
  ],
  ignorePatterns: [
    'coverage/',
  ],
  overrides: [
    {
      files: [
        '**/**',
      ],
      extends: [
        'node-moar-stricter',
      ],
      rules: {
        'camelcase': 'off',
        'fp/no-mutation': 'off',
        'fp/no-this': 'off',
        'fp/no-throw': 'off',
        'node/no-unpublished-require': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'unicorn/prefer-top-level-await': 'off',
        // 'unicorn/no-array-reduce': 'off',
      },
    },
    {
      files: [
        '**/tests/**',
      ],
      extends: [
        'node-moar-test',
      ],
    },
    {
      files: [
        '**/fixtures/**',
        '.eslintrc.js',
        'jest.config.js',
        'jest.config.*.js',
      ],
    },
  ],
}
