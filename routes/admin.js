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
admrouter.get('/profile/edit', AdminController.editAdminProfile)


admrouter.get('/hotels', AdminController.showHotels)

admrouter.get('/addHotel', (req, res) => {
  res.render('pages/addHotel', { pageTitle: 'Add Hotel' })
})

admrouter.post('/addHotel', AdminController.createHotel)

admrouter.get('/:id/hotelDetail', AdminController.showRooms)

admrouter.get('/:HotelId/addRoom', AdminController.addRoomForm)

admrouter.post('/:HotelId/addRoom', AdminController.createRoom)

admrouter.get('/:HotelId/delete', AdminController.deleteHotel)

admrouter.get('/:HotelId/deleteRoom/:RoomId', AdminController.deleteRoom)

//logout
admrouter.get('/logout/:AdminId')



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