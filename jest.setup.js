/**
 * Jest setup file for PLZ Checker webapp
 * Configures testing environment and global mocks
 */

import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock window.fetch
global.fetch = jest.fn();

// Mock URLSearchParams
global.URLSearchParams = jest.fn(() => ({
  toString: () => 'plz=12345'
}));

// Mock AbortController
global.AbortController = jest.fn(() => ({
  abort: jest.fn(),
  signal: {}
}));

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});