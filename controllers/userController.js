const { User, Profile } = require('../models/index.js');
const bcryptjs = require('bcryptjs');

class UserController {
    static register(req, res) {
        const { fullName, email, password, address, phoneNumber, gender } = req.body
        User.create({ fullName, email, password, address, phoneNumber, role: 'customer' })
            .then((user) => {
                return Profile.create({
                    gender,
                    dateOfBirth: new Date(),
                    nik: '',
                    UserId: user.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            })
            .then((_) => res.redirect('/login'))
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
                        return res.redirect('/')
                    } else {
                        return res.redirect(`/login?errors=Invalid Username or Password`)
                    }
                } else {
                    return res.redirect(`/login?errors=User Not Found`)
                }
            })
    }
}

module.exports = UserController