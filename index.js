const express = require('express')
const app = express()

const PORT = 4000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => console.log(`App started at ${PORT}`));

// control + c stops the server //