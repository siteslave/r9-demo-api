import Knex = require('knex');

export class StudentModel {
  getList(knex: Knex) {
    return knex('students')
      .orderBy('first_name', 'DESC')
      .limit(10)
      // .offset(offset);
  }

  getTotal(knex: Knex) {
    return knex('students')
      .count('* as total');
  }

  registerDevice(knex: Knex, id: any, deviceToken: string) {
    return knex('users')
      .update({
        device_token: deviceToken
      })
      .where('id', id);
  }

  getUsers(knex: Knex) {
    return knex('users')
    .select('id', 'fullname')
  }

  getGroups(knex: Knex) {
    return knex('groupid')
  }

  getUserTokenById(knex: Knex, ids: any[]) {
    return knex('users')
      .select('device_token')
      .whereIn('id', ids);
  }

}

