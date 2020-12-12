const { app, BrowserWindow, ipcMain } = require("electron");

let win = null;

function createWindow() {
  win = new BrowserWindow({
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

  win.menuBarVisible = process.platform === "darwin";
  win.loadFile("app/index.html");

  win.show();
}

ipcMain.on("close", (_, __) => {
  app.quit();
});

ipcMain.on("minimize", (_, __) => {
  win.minimize();
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
