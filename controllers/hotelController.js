const { Hotel, Reservation, Room } = require('../models');

class hotelController {

    static showHotels(req, res) {
        Hotel.findAll()
            .then(hotels => {
                // res.send(hotels)
                res.render('pages/hotels', { hotels, pageTitle: 'Book Hotels'})
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = hotelController