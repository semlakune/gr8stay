const express = require('express')

const UserController = require('../controllers/UserController')
const HotelController = require('../controllers/HotelController')

const router = express.Router()


// authentication
router.get('/login', (req, res) => {
    res.render('auth/login', { pageTitle: 'Login' })
})

router.post('/login', UserController.login)

router.get('/register', (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' })
})

router.post('/register', UserController.register)

router.use((req,res,next)=>{
  if(!req.session.email){
    res.redirect('/login')
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

// router.get('/hotels/add', )
// router.post('/hotels/add', )

router.get('/hotels/:IdHotel/book', HotelController.hotelDetails)
router.post('/hotels/:IdHotel/book/:IdRoom', HotelController.postBook)

// router.get('/hotels/:IdHotel/room/add', )
// router.post('/hotels/:IdHotel/room/add', )

// router.get('/hotels/:IdHotel/room/edit/:IdRoom', )
// router.post('/hotels/:IdHotel/room/edit/:IdRoom', )

// router.get('/hotels/:IdHotel/room/delete/:IdRoom', )


module.exports = router