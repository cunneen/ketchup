const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  onTimerStatusChange: (isRunning) => {
    ipcRenderer.send("timerStatusChange", isRunning);
  },
  onTimeRemainingUpdate: (timeRemaining) => {
    ipcRenderer.send("timeRemainingUpdate", timeRemaining);
  },

  onStartTimer: (callback) =>
    ipcRenderer.on("startTimer", (_event, value) => callback(value)),
  onStopTimer: (callback) =>
    ipcRenderer.on("stopTimer", (_event, value) => callback(value)),
});
