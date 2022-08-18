const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routers = require('./routes/index');
const admrouter = require('./routes/admin');
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'gr8stay',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
   }
}))

app.use('/admin',admrouter)
app.use(routers)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})