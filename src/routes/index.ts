'use strict';

import * as express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/',(req,res,next) => {
  res.send({ ok: true, message: 'Welcome to my service!' });
});

router.get('/hello',(req,res,next) => {
  res.send({ ok: true, message: 'Hello, IONIC!!!' });
});

router.post('/hello',(req,res,next) => {
  res.send({ ok: true, message: 'Hello, Angular!!!' });
});

export default router;