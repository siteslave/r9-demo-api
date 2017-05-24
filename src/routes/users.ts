'use strict';

import * as express from 'express';
import { UserModel } from '../models/user';

const router = express.Router();

const userModel = new UserModel();

router.post('/',(req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let db = req.db;

  userModel.doLogin(db, username, password)
    .then((rows) => {
      res.send({ ok: true, rows: rows });
    })
    .catch((error) => {
      console.log(error);
      res.send({ ok: false, error: error.message });
    });
});

export default router;