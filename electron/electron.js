const { BrowserWindow, app } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');
const log = require('electron-log');

// eslint-disable-next-line no-unused-expressions
require('electron').process;

let win = null;

log.info(app.getPath('userData'));

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    log.info(
      'Someone tried to run a second instance, we should focus our window.'
    );
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  // Create myWindow, load the rest of the app, etc...
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) createWindow();
  });
}

async function createWindow() {
  // eslint-disable-next-line require-atomic-updates

  // Load the previous state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  // Extract CLI parameter: Window Coordinates
  const windowIndex = process.argv.findIndex((item) => item === '--window') + 1;
  const [xx, yy, w, h] = process.argv[windowIndex].split(',');

  const { x, y, width, height } = {
    x: parseInt((yy && w && h && xx) || 0, 10),
    y: parseInt(yy, 10),
    width: parseInt(w, 10),
    height: parseInt(h, 10),
  };
  // Create the window using the state information
  win = new BrowserWindow({
    x,
    y,
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'RED BREADCRUMB',
  });
  win.setMenu(null);

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win);

  win.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      callback(true);
    }
  );

  const url = isDev
    ? 'http://localhost:3000/'
    : `file://${path.join(__dirname, '../index.html')}`;

  win.loadURL(url);
  // isAllowedToUpdate && sendStatusToWindow('Software-Updates enabled.')

  //  Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}
