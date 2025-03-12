const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  MenuItem,
  ipcMain,
} = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// global reference to the tray object
let tray;

let isQuitting = false; // boolean to track if the app is quiting
let timeRemainingHuman = "00:00:00"; // tracks the time remaining from the render window
let isTimerRunning = false; // tracks the timer status from the render window

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 320,
    height: 480,
    backgroundColor: "#2b3e50",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.on("close", (e) => {
    if (!isQuitting) {
      e.preventDefault();

      // Unlike usual browsers that a message box will be prompted to users, returning
      // a non-void value will silently cancel the close.
      // It is recommended to use the dialog API to let the user confirm closing the
      // application.
      e.returnValue = false;
      mainWindow.hide();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  trayCreateOrUpdate(mainWindow);

  // handlers from the renderer window
  const rendererEventHandlers = {
    timerStatusChange: (event, isRunning) => {
      isTimerRunning = isRunning;
      trayCreateOrUpdate();
    },
    timeRemainingUpdate: (event, timeRemaining) => {
      timeRemainingHuman = timeRemaining;
      trayCreateOrUpdate();
    },
  };
  for (const [eventName, handlerFn] of Object.entries(rendererEventHandlers)) {
    ipcMain.on(eventName, handlerFn);
  }

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", (e) => {
  // we need to explicitly close our window
  isQuitting = true;
  mainWindow.close();
});

const toggleWindow = (window) => {
  window.isVisible() ? window.hide() : window.show();
};

const trayCreateOrUpdate = (window) => {
  const iconName = isTimerRunning ? "tomato-32.png" : "tomato-32Template.png";
  const iconPath = path.join(__dirname, "images", iconName);
  if (!tray) {
    createTray(window, iconPath);
  } else {
    tray.setImage(iconPath);
  }
  const trayTitle = isTimerRunning ? timeRemainingHuman : "";
  tray.setTitle(trayTitle);
  const timeRemainingMenuItemText = isTimerRunning
    ? timeRemainingHuman
    : "timer not running";

  const timeRemainingMenuItem = new MenuItem({
    label: timeRemainingMenuItemText,
    type: "normal",
    enabled: false,
  });

  const showWindowMenuItem = new MenuItem({
    label: "Show Window",
    click: function () {
      mainWindow.show();
    },
  });

  const startTimerMenuItem = new MenuItem({
    label: "Start Timer",
    click: function () {
      mainWindow.webContents.send("startTimer");
    },
  });

  const stopTimerMenuItem = new MenuItem({
    label: "Stop Timer",
    click: function () {
      mainWindow.webContents.send("stopTimer");
    },
  });

  const contextMenu = Menu.buildFromTemplate([
    timeRemainingMenuItem,
    showWindowMenuItem,
    startTimerMenuItem,
    stopTimerMenuItem,
    { type: "separator" },
    { label: "Quit", type: "normal", role: "quit" },
  ]);
  tray.setContextMenu(contextMenu);
};

const createTray = (window, iconPath) => {
  tray = new Tray(iconPath);

  tray.setToolTip("Ketchup Pomodoro Timer: right-click to quit");
  tray.on("click", function (event) {
    toggleWindow(window);
  });

  tray.on("right-click", function (event) {
    tray.popUpContextMenu();
  });
};

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
