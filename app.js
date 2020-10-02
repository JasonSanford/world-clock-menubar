const { menubar } = require('menubar');

const mb = menubar();

const DEBUG = true;

mb.on('after-create-window', () => {
  if (DEBUG) {
    mb.window.openDevTools();
  }
});

mb.on('ready', () => {
  console.log('app is ready');
});
