import { createRequire } from 'node:module';
import { jest } from '@jest/globals';

const require = createRequire(import.meta.url);

jest.mock('electron', () => ({
  app: {
    on: jest.fn(),
    whenReady: jest.fn(() => Promise.resolve()),
  },
  BrowserWindow: jest.fn().mockImplementation(() => ({
    loadFile: jest.fn(() => Promise.resolve()),
    on: jest.fn(),
  })),
}));

const { BrowserWindow } = require('electron');
const exportedForTests = require('../src/main.cjs');

test('Private props exported for unit tests', () => {
  expect(exportedForTests).toBeDefined();
});

test('func createWindow()', () => {
  const { createWindow } = exportedForTests;

  createWindow();
  expect(BrowserWindow).toHaveBeenCalledTimes(1);
});
