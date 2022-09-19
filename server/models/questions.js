const postgres = require ('../db/index.js');

module.exports = {
  getQuestions: function (params) {
    // let queryString = 'select * from questions where reported = false limit 5';
    let queryString =
    `SELECT id as question_id, question_body, question_date, asker_name, question_helpfulness, reported
      FROM questions
      WHERE product_id = ${params.product_id} AND reported = FALSE`
    return postgres.query(queryString);
  },

  postQuestion: function (params) {
    let queryString = `INSERT INTO questions (question_body, asker_name, asker_email, product_id) VALUES ('${params.body}', '${params.name}', '${params.email}', '${params.product_id}')`;
    return postgres.query(queryString);
  }
};