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
        'fp/no-throw': 'off',
        'fp/no-this': 'off',
        'fp/no-mutation': 'off',
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
