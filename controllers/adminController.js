const { User, Hotel, Reservation, Room, Profile } = require('../models');
const bcryptjs = require('bcryptjs');

class AdminController {
    static register(req, res) {
        const { fullName, email, password, address, phoneNumber } = req.body
        User.create({ fullName, email, password, address, phoneNumber, role: 'admin' })
            .then((_) => res.redirect('/hotels'))
            .catch(err => res.send(err))
    }

    static login(req, res) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(e => {
                if (e) {
                    const isValidPassword = bcryptjs.compareSync(password, e.password)
                    if (isValidPassword) {
                        req.session.user = { userId: e.id, email: e.email, role: e.role }
                        return res.redirect('/admin/hotels')
                    } else {
                        return res.redirect(`/admin/login?errors=Invalid Username or Password`)
                    }
                } else {
                    return res.redirect(`/admin/login?errors=User Not Found`)
                }
            })
    }

    static adminProfile(req, res) {
        const id = req.session.user.userId
        User.findByPk(id, {include : Profile})
            .then(admin => {
                // res.send(admin)
                res.render('pages/admin-profile', { admin, pageTitle: 'Admin Profile' })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editAdminProfile(req, res) {
        const id = req.session.user.userId
        User.findByPk(id)
            .then(admin => {
                // res.send(admin)
                res.render('pages/edit-admin-profile', { admin, pageTitle: 'Edit Profile' })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showHotels(req, res) {
        Hotel.findAll()
            .then(hotels => {
                // res.send(hotels)
                res.render('pages/hotelsList', { hotels, pageTitle: 'Dashboard' })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static createHotel(req, res) {
        let input = req.body

        Hotel.create(
            {
                name: input.name,
                address: input.address,
                imgUrl: input.imgUrl
            }
        )
            .then(e => res.redirect('/admin/hotels'))
            .catch(e => res.send(e))
    }

    static showRooms(req,res) {
        Hotel.findByPk(+req.params.id, { include: Room })
            .then(hotel => [
                // res.send(hotel)
                res.render('pages/admin-hotel-details', { hotel, pageTitle: `Hotel ${hotel.name}` })
            ])
            .catch(err => {
                res.send(err)
            })
    }

    static addRoomForm(req,res){
        let HotelId = req.params.HotelId
        Hotel.findOne({where:{id:HotelId}})
        .then(e => res.render('pages/admin-addRoom', { pageTitle: 'Add Hotel', hotel : e }))
        .catch(err => res.send(err))
    }

    static createRoom(req,res){
        let HotelId = req.params.HotelId
        let input = req.body

        let {capacity,facility,price,imgUrl,roomType} = input

        Room.create({capacity,facility,price,imgUrl,roomType,HotelId})
        .then(e => res.redirect(`/admin/${HotelId}/hotelDetail`))
        .catch(err => res.send(err))
    }

    static deleteHotel(req,res){
        let HotelId = req.params.HotelId
        Hotel.destroy({where: {id : HotelId}})
        .then(e => res.redirect('/admin/hotels'))
        .catch(err => {
            if(err.name = 'SequelizeForeignKeyConstraintError') return res.send('Hotel masih punya room atau masih direservasi!')
            else return res.send(err)
        })
    }

    static deleteRoom(req,res){
        let HotelId = req.params.HotelId
        let RoomId = req.params.RoomId

        Room.destroy({where: {id : RoomId, HotelId : HotelId}})
        .then(e => res.redirect(`/admin/${HotelId}/hotelDetail`))
        .catch(err => {
            if(err.name = 'SequelizeForeignKeyConstraintError') return res.send('Room masih dipesan!')
            else return res.send(err)
        })
    }
}

module.exports = AdminController