import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.js', 'tests/unit/**/*.spec.ts', 'tests/unit/**/*.spec.js'],
    exclude: ['tests/e2e/**', 'node_modules/**']
  }
});
