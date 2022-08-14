const { BrowserWindow, app } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      devTools: true,
      webSecurity: true,
    },
  });

  mainWindow.loadFile('index.html').finally(() => { });

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(() => {
  if (process.env.NODE_ENV !== 'test') createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
}).finally(() => { });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

if (process.env.NODE_ENV === 'test') {
  module.exports = { createWindow };
}
