const express = require('express')
const app = express()
const port = 5000

app.get('/status', (req, res) => {
  res.send("Backend is running")
})
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})