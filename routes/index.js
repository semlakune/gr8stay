const express = require('express')
const HotelController = require('../controllers/HotelController')
const router = express.Router()


// authentication
router.get('/login', (req, res) => {
    res.render('auth/login', { pageTitle: 'Login' })
})

router.get('/register', (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' })
})

// pages
router.get('/', (req, res) => {
  res.render('pages/home', { pageTitle: 'Home' })
})
router.get('/location', (req, res) => {
  res.render('pages/location', { pageTitle: 'Book Hotel' })
})



router.get('/hotels', HotelController.showHotels)

router.get('/hotels/add', )
router.post('/hotels/add', )

router.get('/hotels/:IdHotel/book', HotelController.hotelDetails)

router.get('/hotels/:IdHotel/room/add', )
router.post('/hotels/:IdHotel/room/add', )

router.get('/hotels/:IdHotel/room/edit/:IdRoom', )
router.post('/hotels/:IdHotel/room/edit/:IdRoom', )

router.get('/hotels/:IdHotel/room/delete/:IdRoom', )


module.exports = router