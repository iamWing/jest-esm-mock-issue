# Jest ESM Mock Issue

This is a minimal repo to reproduce the issue of using `jest.mock` function
to partially mock the `electron` module when ESM support is enabled.

### Code with issue

The following code should have mock the functions `app.on`, `app.whenReady` and
component `BrowserWindow` from `electron`. However it seems to have no effect
with ESM support activated.

```js
// main.spec.js

import { jest } from '@jest/globals';
import { BrowserWindow } from 'electron';
import { exportedForTests } from '../src/main.cjs';

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

// test cases
...
```
```
npm t     

> jest-esm-mock-issue@1.0.0 test
> cross-env NODE_ENV=test NODE_OPTIONS=--experimental-vm-modules jest

(node:45275) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 FAIL  tests/main.spec.js
  ● Test suite failed to run

    TypeError: Cannot read properties of undefined (reading 'whenReady')

      20 | }
      21 |
    > 22 | app.whenReady().then(() => {
         |     ^
      23 |   if (process.env.NODE_ENV !== 'test') createWindow();
      24 |
      25 |   app.on('activate', () => {

      at Object.whenReady (src/main.cjs:22:5)
          at async Promise.all (index 2)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.28 s
Ran all test suites.
```
