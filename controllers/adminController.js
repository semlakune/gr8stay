const { User } = require('../models/index.js');
const bcryptjs = require('bcryptjs');

class AdminController {
    static register(req,res) {
        const { fullName, email, password, address, phoneNumber } = req.body
        User.create({ fullName, email, password, address, phoneNumber, role : 'admin' })
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
                    req.session.user = {userId:e.id,email : e.email, role : e.role}
                    return res.redirect('/admin')
                } else {
                    return res.redirect(`/admin/login?errors=Invalid Username or Password`)
                }
            } else{
                return res.redirect(`/admin/login?errors=User Not Found`)
            }            
        })
    }
}

module.exports = AdminController