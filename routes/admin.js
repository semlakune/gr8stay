const express = require('express')

const AdminController = require('../controllers/adminController')
const HotelController = require('../controllers/HotelController')

const admrouter = express.Router()


// authentication
admrouter.get('/login', (req, res) => {
  let errors = req.query.errors
    res.render('auth/adminlogin', { pageTitle: 'Admin Login', errors})
})

admrouter.post('/login', AdminController.login)

admrouter.get('/register', (req, res) => {
    res.render('auth/adminregister', { pageTitle: 'Admin Register' })
})

admrouter.post('/register', AdminController.register)

//middleware admin
admrouter.use((req,res,next)=>{
  if(!req.session.user || req.session.user.role !== 'admin'){
    res.redirect('/admin/login?errors=Silahkan Login terlebih dahulu')
  }else {
    next()
  }
})

// pages
admrouter.get('/', (req, res) => {
  res.render('pages/home', { pageTitle: 'Home' })
})
admrouter.get('/location', (req, res) => {
  res.render('pages/location', { pageTitle: 'Book Hotel' })
})



// admrouter.get('/hotels', HotelController.showHotels)

// admrouter.get('/hotels/add', )
// admrouter.post('/hotels/add', )

// admrouter.get('/hotels/:IdHotel/book', HotelController.hotelDetails)

// admrouter.get('/hotels/:IdHotel/room/add', )
// admrouter.post('/hotels/:IdHotel/room/add', )

// admrouter.get('/hotels/:IdHotel/room/edit/:IdRoom', )
// admrouter.post('/hotels/:IdHotel/room/edit/:IdRoom', )

// admrouter.get('/hotels/:IdHotel/room/delete/:IdRoom', )


module.exports = admrouter