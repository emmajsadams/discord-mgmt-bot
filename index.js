const setupCron = require("./src/setupCron");
const setupHttpRetry = require("./src/setupHttpRetry");
const setupEventHandlers = require("./src/setupEventHandlers");
const setupServer = require("./src/setupServer");

setupHttpRetry();
setupCron();
setupEventHandlers();
setupServer();
