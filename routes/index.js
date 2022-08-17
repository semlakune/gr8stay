const express = require('express')
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

router.get('/hotels', (req, res) => {
  res.render('pages/hotels', { pageTitle: 'Book Hotel' })
})



module.exports = router