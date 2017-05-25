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

router.get('/chart-data', (req, res, next) => {
  let data = [
    {
      "HOSPCODE": "04007",
      "HOSPNAME": "โรงพยาบาลซับใหญ่",
      "cup_code": "04007",
      "S_A_TAKIS": "190",
      "S_B_TAKIS": "200",
      "PERSEN_TAKIS": "95.00 %"
    },
    {
      "HOSPCODE": "10702",
      "HOSPNAME": "โรงพยาบาลชัยภูมิ",
      "cup_code": "10702",
      "S_A_TAKIS": "1087",
      "S_B_TAKIS": "1216",
      "PERSEN_TAKIS": "89.39 %"
    },
    {
      "HOSPCODE": "10970",
      "HOSPNAME": "โรงพยาบาลบ้านเขว้า",
      "cup_code": "10970",
      "S_A_TAKIS": "297",
      "S_B_TAKIS": "391",
      "PERSEN_TAKIS": "75.96 %"
    },
    {
      "HOSPCODE": "10971",
      "HOSPNAME": "โรงพยาบาลคอนสวรรค์",
      "cup_code": "10971",
      "S_A_TAKIS": "462",
      "S_B_TAKIS": "463",
      "PERSEN_TAKIS": "99.78 %"
    },
    {
      "HOSPCODE": "10972",
      "HOSPNAME": "โรงพยาบาลเกษตรสมบูรณ์",
      "cup_code": "10972",
      "S_A_TAKIS": "852",
      "S_B_TAKIS": "1050",
      "PERSEN_TAKIS": "81.14 %"
    },
    {
      "HOSPCODE": "10973",
      "HOSPNAME": "โรงพยาบาลหนองบัวแดง",
      "cup_code": "10973",
      "S_A_TAKIS": "1090",
      "S_B_TAKIS": "1129",
      "PERSEN_TAKIS": "96.55 %"
    },
    {
      "HOSPCODE": "10974",
      "HOSPNAME": "โรงพยาบาลจัตุรัส",
      "cup_code": "10974",
      "S_A_TAKIS": "745",
      "S_B_TAKIS": "747",
      "PERSEN_TAKIS": "99.73 %"
    },
    {
      "HOSPCODE": "10975",
      "HOSPNAME": "โรงพยาบาลบำเหน็จณรงค์",
      "cup_code": "10975",
      "S_A_TAKIS": "542",
      "S_B_TAKIS": "545",
      "PERSEN_TAKIS": "99.45 %"
    },
    {
      "HOSPCODE": "10976",
      "HOSPNAME": "โรงพยาบาลหนองบัวระเหว",
      "cup_code": "10976",
      "S_A_TAKIS": "0",
      "S_B_TAKIS": "12",
      "PERSEN_TAKIS": "0.00 %"
    },
    {
      "HOSPCODE": "10977",
      "HOSPNAME": "โรงพยาบาลเทพสถิต",
      "cup_code": "10977",
      "S_A_TAKIS": "812",
      "S_B_TAKIS": "897",
      "PERSEN_TAKIS": "90.52 %"
    },
    {
      "HOSPCODE": "10978",
      "HOSPNAME": "โรงพยาบาลภูเขียว",
      "cup_code": "10978",
      "S_A_TAKIS": "1099",
      "S_B_TAKIS": "1102",
      "PERSEN_TAKIS": "99.73 %"
    },
    {
      "HOSPCODE": "10979",
      "HOSPNAME": "โรงพยาบาลบ้านแท่น",
      "cup_code": "10979",
      "S_A_TAKIS": "421",
      "S_B_TAKIS": "421",
      "PERSEN_TAKIS": "100.00 %"
    },
    {
      "HOSPCODE": "10980",
      "HOSPNAME": "โรงพยาบาลแก้งคร้อ",
      "cup_code": "10980",
      "S_A_TAKIS": "1102",
      "S_B_TAKIS": "1102",
      "PERSEN_TAKIS": "100.00 %"
    },
    {
      "HOSPCODE": "10981",
      "HOSPNAME": "โรงพยาบาลคอนสาร",
      "cup_code": "10981",
      "S_A_TAKIS": "500",
      "S_B_TAKIS": "549",
      "PERSEN_TAKIS": "91.07 %"
    },
    {
      "HOSPCODE": "10982",
      "HOSPNAME": "โรงพยาบาลภักดีชุมพล",
      "cup_code": "10982",
      "S_A_TAKIS": "342",
      "S_B_TAKIS": "342",
      "PERSEN_TAKIS": "100.00 %"
    },
    {
      "HOSPCODE": "10983",
      "HOSPNAME": "โรงพยาบาลเนินสง่า",
      "cup_code": "10983",
      "S_A_TAKIS": "238",
      "S_B_TAKIS": "238",
      "PERSEN_TAKIS": "100.00 %"
    }
  ];
  res.send(data);
});

router.post('/hello',(req,res,next) => {
  res.send({ ok: true, message: 'Hello, Angular!!!' });
});

export default router;