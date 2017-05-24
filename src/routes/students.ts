'use strict';

import * as express from 'express';
const router = express.Router();

import { StudentModel } from '../models/student';

const studentModel = new StudentModel();

router.get('/list', (req, res, next) => {
  let db = req.db;
  studentModel.getList(db)
    .then((rows: any) => {
      res.send({ ok: true, rows: rows });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message });
    });
});

export default router;