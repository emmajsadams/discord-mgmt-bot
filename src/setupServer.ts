import express from 'express'
import backup from './backup'

export default function setupServer(): void {
  const app = express()

  app.get('/', async (req, res) => {
    res.send({ success: true, message: 'Bot healthy' })
  })

  app.get('/backup', async (req, res) => {
    if (req.query.key !== process.env.BACKUP_API_KEY) {
      return res.status(401).send({
        success: false,
        message: 'No api key or incorrect api key specified',
      })
    }

    res.send({
      success: true,
      message:
        'Backup started in background, check server ./backups for json file',
    })
    await backup()
  })

  app.listen(8080, () => {
    console.log('express server started on port 8080')
  })
}
