const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// 1. Pro Audio & Low-Latency Flags
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-renderer-backgrounding');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1680,
    height: 1000,
    minWidth: 1200,
    minHeight: 760,
    title: 'METROTUNE DRUM MACHINE WORKSTATION (64-Step Sampler)',
    backgroundColor: '#090a0f',
    autoHideMenuBar: true,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: false,
      backgroundThrottling: false
    }
  });

  Menu.setApplicationMenu(null);

  // Load from local streaming audio server (with file fallback)
  mainWindow.loadURL('http://127.0.0.1:8484/').catch(() => {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  });

  // F11 for Fullscreen Mode
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11' && input.type === 'keyDown') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
