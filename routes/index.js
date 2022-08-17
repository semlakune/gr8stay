const express = require('express')
const hotelController = require('../controllers/hotelController')
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

router.get('/hotels', hotelController.showHotels)



module.exports = router