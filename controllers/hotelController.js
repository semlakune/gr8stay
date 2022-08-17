const { Hotel, Reservation, Room, User } = require('../models');
const { Sequelize } = require('sequelize');

class HotelController {

    static reservation(req, res) {
        Hotel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('address')) ,'address'],
            ]
        })
            .then(address => {
                const data = address.map(a => {
                    return a.address
                })
                res.render('pages/reservation', { address: data, pageTitle: 'Reservation' })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showHotels(req, res) {
        let address = req.query.address
        Hotel.getLocation(address)
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

    static postBook(req, res) {
        const data = {
            RoomId: req.params.IdRoom,
            HotelId: req.params.IdHotel,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            UserEmail: req.session.email
        }

        res.send(data)
    }

}

module.exports = HotelController