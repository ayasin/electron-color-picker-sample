'use strict';

const app = require('app');
const path = require('path');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const electron = require('electron');
const AppMenuTemplate = require('./menus/application.menu.js');
const router = require('electron-request-response/main');

var firstWindow = null;
var secondWindow = null;

app.on('ready', () => {
  let screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
  firstWindow = new BrowserWindow(
    {
      x: screenSize.width / 2 - 500,
      y: screenSize.height / 2 - 100,
      height: 200,
      width: 500,
      frame: true,
      center: false,
      resizeable: true
    }
  );
  firstWindow.loadURL('file://' + path.join(__dirname, '..', 'screens', 'first.window.html'));

  // make the first window addressable under host 'first-window'
  router.makeAddressable('first-window', firstWindow);

  secondWindow = new BrowserWindow(
    {
      x: screenSize.width / 2,
      y: screenSize.height / 2 - 200,
      height: 400,
      width: 400,
      frame: false,
      center: false,
      resizeable: false
    }
  );
  secondWindow.loadURL('file://' + path.join(__dirname, '..', 'screens', 'second.window.html'));

  // make the second window addressable under host 'second-window'
  router.makeAddressable('second-window', secondWindow);

  Menu.setApplicationMenu(Menu.buildFromTemplate(AppMenuTemplate));

  // add a route for copy-to-clipboard so second-window can send us this message
  router.registerRoute('/copy-to-clipboard', (data, callback) => {
    electron.clipboard.writeText(data);
    callback(null, 'success');
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
