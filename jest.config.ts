import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '@config/(.*)': '<rootDir>/config/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@features/(.*)': '<rootDir>/src/features/$1',
    '@supabase/(.*)': '<rootDir>/src/supabase/$1',
    '@public/(.*)': '<rootDir>/public/$1',
    '^axios$': 'axios/dist/node/axios.cjs',
  },
};

export default config;
