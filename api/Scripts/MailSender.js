const nodemailer = require("nodemailer");
var fs = require('fs');
var templateMessage = ''
let readfile = fs.readFile("api/Scripts/mail.html",function (err,resp) {
  // body...
  if(err){
    console.log(err)
  }else{
    templateMessage = resp.toString();
    // console.log(templateMessage);
  }
});

module.exports = {
  sendMail:sendMail
};

// async function getMail() {
//   // body...
//   let readfile = fs.readFile("messageHTML.html",function (err,resp) {
//     // body...
//     if(err){

//     }else{
      
//       console.log(resp.toString());
//     }
//   });
//   // console.log(readfile,'adsh')
// }

// getMail()
async function sendMail(sendTo,otp,user_id,cb){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // var templateMessage = ''
  // let readfile = fs.readFile("api/Scripts/mail.html",function (err,resp) {
  //   // body...
  //   if(err){
  //     console.log(err)
  //   }else{
  //     templateMessage = resp.toString();
  //     console.log(templateMessage);
  //   }
  // });

  templateMessage = templateMessage.replace('{{otp}}',otp);
  templateMessage = templateMessage.replace('{{user_id}}',user_id);
  templateMessage = templateMessage.replace('{{email}}',sendTo);
  console.log(templateMessage,'templateMessage');
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'Kcircuit122@gmail.com', // generated ethereal user
      pass: 'kcircuit@2468#' // generated ethereal password
    }
  });

  console.log(templateMessage,'templateMessage');
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Kcircuit122@gmail.com', // sender address
    to: sendTo, // list of receivers
    subject: "Activate your account", // Subject line
    // text: "Hello world?", // plain text body
    html: templateMessage // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  if(!info)
  	cb('error',info)
  else
  	cb(null,info)
}

// sendMail().catch(console.error);