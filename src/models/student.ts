import Knex = require('knex');

export class StudentModel {
  getList(knex: Knex) {
    return knex('students')
      .orderBy('first_name', 'DESC')
      .limit(10);
  }
}

