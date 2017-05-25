'use strict';

import * as express from 'express';
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

export default router;