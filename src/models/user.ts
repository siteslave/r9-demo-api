import Knex = require('knex');

export class UserModel {
  doLogin(knex: Knex, username: any, password: any) {
    return knex('users')
      .select('id', 'username', 'fullname')
      .where({
        username: username,
        password: password
      });
  }
}