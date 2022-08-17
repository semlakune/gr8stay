const { Hotel, Reservation, Room } = require('../models');

class HotelController {

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

    static hotelDetails(req, res) {
        Hotel.findByPk(+req.params.IdHotel, { include: Room })
            .then(hotel => [
                // res.send(hotel)
                res.render('pages/hotel-detail', { hotel, pageTitle: `Hotel ${ hotel.name }` })
            ])
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = HotelController