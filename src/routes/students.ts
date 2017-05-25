'use strict';

import * as express from 'express';
const router = express.Router();

import { StudentModel } from '../models/student';
import { Encrypt } from '../models/encrypt';

const studentModel = new StudentModel();
const encrypt = new Encrypt();

router.get('/list/:limit/:offset', (req, res, next) => {
  let db = req.db;
  let limit = +req.params.limit;
  let offset = +req.params.offset;

  studentModel.getList(db, limit, offset)
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

export default router;