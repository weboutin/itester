const express = require('express')
const app = express()
const port = 4003

let count = 0;
app.all('*', (req, res) => {
  console.log(count++)
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
