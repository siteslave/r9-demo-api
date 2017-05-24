'use strict';

import * as express from 'express';
const router = express.Router();

import { Jwt } from '../models/jwt';

const jwt = new Jwt();
/* GET home page. */
router.get('/',(req,res,next) => {
  res.send({ ok: true, message: 'Welcome to my service!' });
});

router.get('/gen-token',(req,res,next) => {
  jwt.singn({ name: 'Satit Rianpit' })
    .then((token: any) => {
      res.send({ ok: true, token: token });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message });
    });
});

router.get('/hello',(req,res,next) => {
  res.send({ ok: true, message: 'Hello, IONIC!!!' });
});

router.post('/hello',(req,res,next) => {
  res.send({ ok: true, message: 'Hello, Angular!!!' });
});

export default router;