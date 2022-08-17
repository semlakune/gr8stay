const express = require('express')
const app = express()
const port = 3000
const routers = require('./routes');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(routers)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})