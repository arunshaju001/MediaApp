const nodemailer = require("nodemailer")

exports.sendMail = async (email,message)=> {
  let testAccount = await nodemailer.createTestAccount();
//   console.log(email,message)

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'wlvr@company.co', 
    to: email,
    subject: "Reciept of your Query", 
    text: "Your message to our company is :\n"+message
  });

  console.log("Message sent: %s", info.messageId)
  return info
}