'use strict';

import * as express from 'express';
const router = express.Router();

import { StudentModel } from '../models/student';

const studentModel = new StudentModel();

router.get('/list/:limit/:offset', (req, res, next) => {
  let db = req.db;
  let limit = +req.params.limit;
  let offset = +req.params.offset;

  studentModel.getList(db, limit, offset)
    .then((rows: any) => {
      res.send({ ok: true, rows: rows });
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