const { User } = require('../models/index.js');
const bcryptjs = require('bcryptjs');

class UserController {
    static register(req,res) {
        const { fullName, email, password, address, phoneNumber } = req.body
        User.create({ fullName, email, password, address, phoneNumber })
            .then(e => res.send(e))
            .catch(err => res.send(err))
    }

    static login(req,res){
        const {email, password} = req.body
        
        User.findOne({where :{email}})
        .then(e =>{
            if(e){
                const isValidPassword = bcryptjs.compareSync(password, e.password)
                if(isValidPassword){
                    req.session.email = e.email
                    return res.redirect('/')
                } else {
                    return res.send('Invalid username or Password')
                }
            } else{
                return res.send('User Not FOund')
            }            
        })
    }
}

module.exports = UserController