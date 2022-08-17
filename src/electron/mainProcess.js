const { ipcMain } = require("electron");
const constant = require("./constant");

ipcMain.on(constant.OPEN_NOTIFICATION, (event, payload) => {
  console.log("data", payload);

  event.reply(constant.OPEN_NOTIFICATION_RES, {
    data: "Pong",
  });
});
