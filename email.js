var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'pharmagisai@gisai.com', // Your email id
      pass: 'giSai1234#.' // Your password
   }
});
var mailOptions = {
   from: 'pruebasgisai@gmail.com>', // sender address
   to: 'beholderalv@gmail.com', // list of receivers
   subject: 'Email Example', // Subject line
   text: 'Prueba con nodemailer' // plaintext body
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        //res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        //res.json({yo: info.response});
    };
});