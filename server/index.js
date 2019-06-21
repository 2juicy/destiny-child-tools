const express = require('express'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      path = require('path')
const app = express()
const port = 3000

// app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json({extended: true, limit: '50mb'}))

app.post('/childs', (req, res) => {
  fs.writeFileSync(path.resolve(__dirname, '../docs/data/childs.json'),
    JSON.stringify(req.body, null, 2)
  )
  res.send(req.body)
})

app.listen(port, () => console.log(`Development API server running on port ${port}!`))
