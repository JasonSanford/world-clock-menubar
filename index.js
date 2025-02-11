const { menubar } = require('menubar');

// process.env.TZ = 'Asia/Kolkata';

const DEBUG = false;

const mb = menubar({
  preloadWindow: true,
  browserWindow: {
    width: 325,
    height: 400,
    resizable: DEBUG,
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
