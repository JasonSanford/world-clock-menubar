const { menubar } = require('menubar');
const { ipcMain } = require('electron');

let window;

const DEBUG = false;

const initialWidth = 435;
const initialHeight = 225;

const settingsWidth = 435;
const settingsHeight = 500;

const mb = menubar({
  preloadWindow: true,
  browserWindow: {
    width: initialWidth,
    height: initialHeight,
    resizable: DEBUG,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  },
});

mb.on('after-create-window', () => {
  if (DEBUG) {
    mb.window.openDevTools();
  }
  window = mb.window;
});

mb.on('show', () => {
  mb.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
});

mb.on('ready', () => {
  console.log('app is ready');
});

ipcMain.on('show-settings', () => {
  window.setSize(settingsWidth, settingsHeight);
});

ipcMain.on('hide-settings', () => {
  window.setSize(initialWidth, initialHeight);
});
