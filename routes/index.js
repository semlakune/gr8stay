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