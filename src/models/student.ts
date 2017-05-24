import Knex = require('knex');

export class StudentModel {
  getList(knex: Knex, limit, offset) {
    return knex('students')
      .orderBy('first_name', 'DESC')
      .limit(limit)
      .offset(offset);
  }

  getTotal(knex: Knex) {
    return knex('students')
      .count('* as total');
  }
}

