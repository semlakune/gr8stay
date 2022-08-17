const express = require('express')
const hotelController = require('../controllers/hotelController')
const UserController = require('../controllers/UserController')
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
router.get('/location', (req, res) => {
  res.render('pages/location', { pageTitle: 'Book Hotel' })
})



router.get('/hotels', hotelController.showHotels)
router.get('/hotels/:IdHotel/book', hotelController.hotelDetails)



module.exports = router