import Knex = require('knex');

export class UserModel {
  doLogin(knex: Knex, username: string, password: string) {
    return knex('users')
      .select('id', 'username', 'fullname')
      .where({
        username: username,
        password: password
      });
  }
}

export interface IUser {
  username?: string;
  passsword?: string;
  id?: string;
  fullname?: string;
}
