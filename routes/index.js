const express = require('express')

const UserController = require('../controllers/UserController')
const HotelController = require('../controllers/HotelController')

const router = express.Router()


// authentication
router.get('/login', (req, res) => {
  let errors = req.query.errors
    res.render('auth/login', { pageTitle: 'Login', errors})
})

router.post('/login', UserController.login)

router.get('/register', (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' })
})

router.post('/register', UserController.register)


//middleware customer
router.use((req,res,next)=>{
  console.log('masuk kesini');
  if(!req.session.user || req.session.user.role !== 'customer'){
    res.redirect('/login?errors=Silahkan Login terlebih dahulu')
  }else {
    next()
  }
})

// pages
router.get('/', (req, res) => {
  res.render('pages/home', { pageTitle: 'Home' })
})
router.get('/reservation', HotelController.reservation)
router.get('/hotels', HotelController.showHotels)
router.get('/hotels/:IdHotel/book', HotelController.hotelDetails)
router.post('/hotels/:IdHotel/book/:IdRoom', HotelController.postBook)
router.get('/itinerary/:IdReservation', HotelController.itinerary)


module.exports = router