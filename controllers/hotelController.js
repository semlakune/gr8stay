const { Hotel, Reservation, Room, User, Profile } = require('../models');
const { Sequelize } = require('sequelize');

const dateFormatter = require('../helpers/dateFormatter');

const nodemailer = require('nodemailer')
const ejs = require('ejs')

let transporter = nodemailer.createTransport({
  service : "gmail",
  auth:{
    user:"gr8stayapp@gmail.com",
    pass:"ldwobfdlxhttobsc"
  }
})


class HotelController {

    static customerProfile(req, res) {
        const id = req.session.user.userId
        User.findByPk(id,{include: Profile})
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
                res.redirect(`/voucher/${reservation.id}`)
            })

            .catch(err => {
                if(err.name == 'SequelizeValidationError') {
                    let errMsg = err.errors.map(e => {
                        return e.message
                    })
                    res.send(errMsg)
                } else {
                    res.send(err)
                }
            })
    }

    static voucher(req, res) {
        Reservation.findByPk(+req.params.IdReservation, { include: [Hotel, Room] })
            .then(voucher => {
                // res.send(voucher)
                ejs.renderFile('./views/pages/voucher.ejs',{ pageTitle: 'Your Hotel Voucher', voucher, dateFormatter },(err,data)=>{
                    if(err) return console.log(err);
                    let mailOptions = {
                        from : "gr8stayapp@gmail.com",
                        to : req.session.user.email,
                        subject : "Hotel Reservation at gr8stay",
                        html :data
                      }
                    transporter.sendMail(mailOptions,(err,success)=>{
                        if(err) return console.log(err);
                        else return console.log(success,'Mail sent succesfully');
                      })
                })
                res.render('pages/voucher', { pageTitle: 'Your Hotel Voucher', voucher, dateFormatter })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getOrders(req,res){
        let UserId = req.session.user.userId

        Reservation.findAll({include :[
            {model : User,
                where : {id : UserId}},
            {model : Hotel},
            {model : Room}
        ]})
        .then(e => res.render('pages/order-list',{pageTitle : "Orders", reservations : e}))
        // .then(e => res.send(e))
        .catch(e => res.send(e))
    }

}

module.exports = HotelController