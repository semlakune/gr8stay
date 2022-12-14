const express = require('express')

const AdminController = require('../controllers/adminController')

const admrouter = express.Router()


// authentication
admrouter.get('/login', (req, res) => {
  let errors = req.query.errors
  res.render('auth/adminlogin', { pageTitle: 'Admin Login', errors })
})

admrouter.post('/login', AdminController.login)

admrouter.get('/register', (req, res) => {
  res.render('auth/adminregister', { pageTitle: 'Admin Register' })
})

admrouter.post('/register', AdminController.register)

//middleware admin
admrouter.use((req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user || req.session.user.role !== 'admin') {
    res.redirect('/admin/login?errors=Silahkan Login terlebih dahulu')
  } else {
    next()
  }
})

// pages
admrouter.get('/profile', AdminController.adminProfile)


admrouter.get('/hotels', AdminController.showHotels)

admrouter.get('/addHotel', (req, res) => {
  res.render('pages/addHotel', { pageTitle: 'Add Hotel' })
})

admrouter.post('/addHotel', AdminController.createHotel)

admrouter.get('/:HotelId/hotelDetail', AdminController.showRooms)

admrouter.get('/:HotelId/addRoom', AdminController.addRoomForm)

admrouter.post('/:HotelId/addRoom', AdminController.createRoom)

admrouter.get('/:HotelId/delete', AdminController.deleteHotel)

admrouter.get('/:HotelId/deleteRoom/:RoomId', AdminController.deleteRoom)

admrouter.get('/:HotelId/editRoom/:RoomId', AdminController.editRoom)
admrouter.post('/:HotelId/editRoom/:RoomId', AdminController.postEditRoom)


module.exports = admrouter