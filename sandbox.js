// const bcryptjs = require('bcryptjs')

// let salt = bcryptjs.genSaltSync(8);
// let hash = bcryptjs.hashSync("ajip12345", salt);

// // user.password = hash

// console.log(hash);
// console.log(bcryptjs.compareSync('ajip12345',hash));

const nodemailer = require('nodemailer')
const ejs = require('ejs')

let transporter = nodemailer.createTransport({
  service : "gmail",
  auth:{
    user:"gr8stayapp@gmail.com",
    pass:"ldwobfdlxhttobsc"
  }
})

ejs.renderFile('./views/pages/home.ejs',{pageTitle : 'Home'},(err,data)=>{
    if(err) return console.log(err);
    let mailOptions = {
        from : "mirzapm13@gmail.com",
        to : "mirzaputraspidol@gmail.com",
        subject : "Hotel Reservation at gr8stay",
        html :data
      }
    transporter.sendMail(mailOptions,(err,success)=>{
        if(err) return console.log(err);
        else return console.log(success,'Mail sent succesfully');
      })
})