'use strict';

import * as express from 'express';
import * as crypto from 'crypto';

import { UserModel, IUser } from '../models/user';

const router = express.Router();
const userModel = new UserModel();

router.post('/',(req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
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

        res.send({ ok: true, token: 'xxxxxxx', fullname: fullname, id: id });
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