const setupCron = require("./src/setupCron");
const setupEventHandlers = require("./src/setupEventHandlers");
const setupServer = require("./src/setupServer");

setupCron();
setupEventHandlers();
setupServer();
