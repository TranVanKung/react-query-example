const { contextBridge, ipcRenderer } = require("electron");

// https://stackoverflow.com/questions/48148021/how-to-import-ipcrenderer-in-react/49034244
// should not expose all @ipcRenderer method to front-end

contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, callback) => ipcRenderer.on(channel, callback),
});
