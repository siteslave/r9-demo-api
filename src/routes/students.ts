'use strict';

import * as express from 'express';
import * as gcm from 'node-gcm';

const router = express.Router();

import { StudentModel } from '../models/student';
import { Encrypt } from '../models/encrypt';

const studentModel = new StudentModel();
const encrypt = new Encrypt();

router.get('/list', (req, res, next) => {
  let db = req.db;
  // let limit = +req.params.limit;
  // let offset = +req.params.offset;

  studentModel.getList(db)
    .then((rows: any) => {
      let strData = JSON.stringify(rows);
      let encText = encrypt.encrypt(strData);

      res.send({ ok: true, data: encText });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message });
    });
});

router.get('/total', (req, res, next) => {
  let db = req.db;
  studentModel.getTotal(db)
    .then((rows: any) => {
      res.send({ ok: true, total: rows[0].total });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message });
    });
});

router.post('/register-device', (req, res, next) => {
  let db = req.db;

  let deviceToken = req.body.deviceToken;
  let id = req.body.id;
  console.log(req.body);
  studentModel.registerDevice(db, id, deviceToken)
    .then((rows: any) => {
      res.send({ ok: true });
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.get('/users-list', (req, res, next) => {
  let db = req.db;

  studentModel.getUsers(db)
    .then((rows: any) => {
      res.send({ ok: true, rows: rows });
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.get('/groups-list', (req, res, next) => {
  let db = req.db;

  studentModel.getGroups(db)
    .then((rows: any) => {
      res.send({ ok: true, rows: rows });
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.post('/save-image', (req, res, next) => {
  let db = req.db;
  let id = req.body.id;
  let image = req.body.image;

  studentModel.saveImage(db, id, image)
    .then((rows: any) => {
      res.send({ ok: true });
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.get('/get-image/:id', (req, res, next) => {
  let db = req.db;
  let id = req.params.id;

  studentModel.getImage(db, id)
    .then((rows: any) => {
      let image = rows[0].image.toString();
      console.log(image);
      res.send({ ok: true, image: image });
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.get('/preview-image/:id', (req, res, next) => {
  let db = req.db;
  let id = req.params.id;

  studentModel.getImage(db, id)
    .then((rows: any) => {
      var img = new Buffer(rows[0].image.toString(), 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': img.length
      });
      res.end(img);
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

router.post('/send-message', (req, res, next) => {
  let db = req.db;
  let ids = req.body.ids;
  let msg = req.body.msg;

  studentModel.getUserTokenById(db, ids)
    .then((rows: any) => {
      let deviceTokens = [];
      rows.forEach(v => {
        deviceTokens.push(v.device_token);
      });

      // ============ send message ==============//

      var message = new gcm.Message();
      message.addData('title', 'ข้อความแจ้งเตือน');
      message.addData('message', msg);
      message.addData('content-available', 'true');
      message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

      // Set up the sender with you API key, prepare your recipients' registration tokens. 
      var sender = new gcm.Sender("AAAAb4spfAw:APA91bHaFQNmxllixo7WZ4L1x1oPW9ypyyRZUE-b64oTDZ4SQPUETubmVzFGocH7mIxcCXqoYqCFaf7Rjq1GO73oQqEqf7sgdp9ZdD5WvBWXVEkN8vI2iRN9041qiV24I2WIX0Z5gEjh");
      // var regTokens = ["fGsRFhYwfXM:APA91bGYqXzizSPSefLFV5VynVgd82a_4NyJwtqwQLGNZzYZ3qBLGQgXYkqIsWfEaVWT2T-WnDrqyIIFWMYb2XPFmaI-eYCeaU07dJB9VZZiMe6XtA8PjZK_Veai1-GTZt_9HASSrp_d"];

      sender.send(message, { registrationTokens: deviceTokens }, (err, response) => {
        if (err) {
          console.log(err);
          res.send({ ok: false, error: err });
        } else {
          res.send({ ok: true, result: response })
        }
      });
      // ========================================
    })
    .catch((error: any) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

export default router;