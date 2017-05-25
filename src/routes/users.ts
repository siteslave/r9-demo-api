'use strict';

import * as express from 'express';
import * as crypto from 'crypto';

import { UserModel, IUser } from '../models/user';
import { Jwt } from '../models/jwt';

import { Encrypt } from '../models/encrypt';

const router = express.Router();
const userModel = new UserModel();
const encrypt = new Encrypt();

const jwt = new Jwt();

router.post('/',(req, res, next) => {
  let data = req.body.data;
  let decryptedText = encrypt.decrypt(data);
  let objData = JSON.parse(decryptedText);

  let username = objData.username;
  let password = objData.password;

  let db = req.db;

  let encPassword = crypto.createHash('md5')
    .update(password)
    .digest('hex');

  userModel.doLogin(db, username, encPassword)
    .then((rows) => {
      // res.send({ ok: true, rows: rows });
      if (rows.length) { // success
        let username = rows[0].username;
        let id = rows[0].id;
        let fullname = rows[0].fullname;
        let payload = { fullname: fullname, id: id };

        jwt.singn(payload)
          .then((token: any) => {
            res.send({ ok: true, token: token });
          })
          .catch((error: any) => {
            res.send({ ok: false, error: error });
          });

      } else { // failed
        res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

export default router;