const { Hotel, Reservation, Room, User, Profile } = require('../models');
const { Sequelize } = require('sequelize');

class HotelController {

    static customerProfile(req, res) {
        const id = req.session.user.userId
        User.findByPk(id,{include : Profile})
            .then(customer => {
                // res.send(customer)
                res.render('pages/customer-profile', { customer, pageTitle: 'Customer Profile' })
            })
            .catch(err => {
                res.send(err)
            })
    }

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
            UserId: req.session.user.userId,
            RoomId: +req.params.IdRoom,
            HotelId: +req.params.IdHotel,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        }
        console.log(data);
        User.findByPk(data.UserId)
            .then(user => {
                
                return Reservation.create({
                    guestName: user.fullName,
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    UserId: data.UserId,
                    HotelId: data.HotelId,
                    RoomId: data.RoomId
                })

            })
            .then(reservation => {
                res.redirect(`/itinerary/${reservation.id}`)
            })

            .catch(err => {
                res.send(err)
            })
    }

    static itinerary(req, res) {
        Reservation.findByPk(+req.params.IdReservation, { include: [Hotel, Room] })
            .then(reservation => {
                res.send(reservation)
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = HotelController