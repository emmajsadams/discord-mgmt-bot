const setupCron = require("./setupCron");
const setupHttpRetry = require("./setupHttpRetry");
const setupEventHandlers = require("./setupEventHandlers");
const setupServer = require("./setupServer");

setupHttpRetry();
setupCron();
setupEventHandlers();
setupServer();
