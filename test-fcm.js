var gcm = require('node-gcm');
 
var message = new gcm.Message();
message.addData('title', 'ประกาศ');
message.addData('message', 'ทดสอบการส่ง Push notification');
message.addData('content-available', true);
message.addData('data', { "username": "Satit", "message": "Hello world" });
message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender("AAAAb4spfAw:APA91bHaFQNmxllixo7WZ4L1x1oPW9ypyyRZUE-b64oTDZ4SQPUETubmVzFGocH7mIxcCXqoYqCFaf7Rjq1GO73oQqEqf7sgdp9ZdD5WvBWXVEkN8vI2iRN9041qiV24I2WIX0Z5gEjh");
var regTokens = ["fGsRFhYwfXM:APA91bGYqXzizSPSefLFV5VynVgd82a_4NyJwtqwQLGNZzYZ3qBLGQgXYkqIsWfEaVWT2T-WnDrqyIIFWMYb2XPFmaI-eYCeaU07dJB9VZZiMe6XtA8PjZK_Veai1-GTZt_9HASSrp_d"];

sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else 	console.log(response);
});