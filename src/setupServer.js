const express = require("express");

const backup = require("./backup");

const setupServer = () => {
  const app = express();

  app.get("/", async (req, res) => {
    res.send({ success: true, message: "Bot healthy" });
  });

  // TODO: add an api key authentication mechanism for triggering backups manually
  app.get("/backup", async (req, res) => {
    res.send({
      success: true,
      message:
        "Backup started in background, check server ./backups for json file",
    });
    await backup();
  });

  app.listen(8080, () => {});

  return app;
};

module.exports = setupServer;
