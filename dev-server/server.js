const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.get('/protocols', (req, res) => {
  res.sendFile(__dirname + '/protocols.json')
})
app.get('/fsms', (req, res) => {
  res.sendFile(__dirname + '/fsms.json')
})
app.listen(8000)
