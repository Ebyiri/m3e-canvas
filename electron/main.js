const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "M3E Canvas",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    // Optional: set icon path if you add one later
    // icon: path.join(__dirname, "../public/icon.ico"),
  });

  // Load the static Next.js export
  const indexPath = path.join(__dirname, "../out/index.html");
  mainWindow.loadFile(indexPath);

  // Uncomment to open DevTools for debugging
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
