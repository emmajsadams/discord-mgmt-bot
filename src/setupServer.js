const express = require('express');

const backup = require('./backup')

const setupServer = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.send({ success: true, message: "Bot healthy" });
  })

  app.get('/backup', async (req, res) => {
    res.send({ success: true, message: "Backup started in background, check server ./backups for json file" });
    backup()
  })

  app.listen(8080, () => {});

  return app;
}

module.exports = setupServer
