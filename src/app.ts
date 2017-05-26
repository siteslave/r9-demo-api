'use strict';

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import index from './routes/index';
import userRoute from './routes/users';
import studentRoute from './routes/students';

import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';
import * as cors from 'cors';

import { Jwt } from './models/jwt';
const jwt = new Jwt();

const app: express.Express = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

let connection: MySqlConnectionConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '043789124',
  database: 'ionic_test'
}

app.use((req, res, next) => {
  req.db = Knex({
    client: 'mysql',
    connection: connection,
    pool: {
      min: 0,
      max: 7,
      afterCreate: (conn, done) => {
        conn.query('SET NAMES utf8', (err) => {
          done(err, conn);
        });
      }
    },
    debug: true,
    acquireConnectionTimeout: 5000
  });
  next();
});

let auth = (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else if (req.body && req.body.token) {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    })
    .catch(error => {
      return res.send({
        ok: false,
        error: 'No token provided.',
        code: 403
      });
    });
}

app.use('/', index);
app.use('/users', userRoute);
app.use('/students', auth, studentRoute);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

app.use((err: Error, req, res, next) => {
  res.status(err['status'] || 500);
  console.log(err);
  res.send({ ok: false, error: err.message });
});

export default app;
