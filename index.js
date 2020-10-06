const { menubar } = require('menubar');

const mb = menubar({
  preloadWindow: true,
  browserWindow: {
    width: 435,
    height: 225,
    // vibrancy: 'popover'
  }
});

const DEBUG = false;

mb.on('after-create-window', () => {
  // mb.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  // mb.app.commandLine.appendSwitch('disable-backgrounding-occluded-windows', 'true');
  if (DEBUG) {
    mb.window.openDevTools();
  }
});

mb.on('show', () => {
  mb.window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
});

mb.on('ready', () => {
  console.log('app is ready');
});
