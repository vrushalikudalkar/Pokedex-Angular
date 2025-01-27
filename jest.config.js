module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    transform: {
      '^.+\\.(ts|mjs|js|html)$': [
        'jest-preset-angular',
        {
          tsconfig: 'tsconfig.spec.json',
          stringifyContentPathRegex: '\\.html$',
        },
      ],
    },
    transformIgnorePatterns: [
      'node_modules/(?!@angular|rxjs|@ngrx|@angular-devkit)',
      'node_modules/(?!.*\\.mjs$)',
    ],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
        diagnostics: false,
      },
    },
  };
  