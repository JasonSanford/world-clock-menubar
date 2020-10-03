const { menubar } = require('menubar');

const mb = menubar({
  browserWindow: {
    width: 465,
    height: 225,
  }
});

const DEBUG = false;

mb.on('after-create-window', () => {
  if (DEBUG) {
    mb.window.openDevTools();
  }
});

mb.on('ready', () => {
  console.log('app is ready');
});
