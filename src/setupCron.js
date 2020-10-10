var cron = require("node-cron");

const backup = require("./backup");

const setupCron = () => {
  cron.schedule("0 0 * * *", async () => {
    await backup();
  });
};

module.exports = setupCron;
