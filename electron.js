const { app, BrowserWindow, ipcMain, shell } = require("electron");
const contextMenu = require("electron-context-menu");

contextMenu({
  showSearchWithGoogle: false,
});

app.on("web-contents-created", (_, contents) => {
  contents.on("new-window", (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });
});

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
    },
    show: false,
    frame: process.platform !== "win32",
    titleBarStyle: process.platform === "darwin" ? "hidden" : "default",
    trafficLightPosition: {
      x: 20,
      y: 36,
    },
  });

  mainWindow.menuBarVisible = process.platform === "darwin";
  mainWindow.loadFile("app/index.html");

  mainWindow.show();
}

ipcMain.on("close", (_, __) => {
  app.quit();
});

ipcMain.on("minimize", (_, __) => {
  mainWindow.minimize();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
