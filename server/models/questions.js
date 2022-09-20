const postgres = require ('../db/index.js');

module.exports = {
  getQuestions: function (params) {
    // let queryString = 'select * from questions where reported = false limit 5';
    let queryString =
    `SELECT q.id as question_id, question_body, question_date, asker_name, question_helpfulness, q.reported,
      COALESCE (json_object_agg(a.id, json_build_object(
        'id', a.id,
        'body', a.body,
        'answerer_name', a.answerer_name,
        'helpfulness', a.helpfulness
      )) FILTER (WHERE a.id IS NOT NULL), '{}') answers
    FROM questions q
    INNER JOIN answers a ON a.question_id = q.id
    WHERE product_id = ${params.product_id} AND q.reported = FALSE
    GROUP BY q.id
    LIMIT ${params.count} OFFSET ${(params.page - 1) * params.count}`;
    return postgres.query(queryString);
  },

  postQuestion: function (params) {
    let queryString = `INSERT INTO questions (question_body, asker_name, asker_email, product_id) VALUES ('${params.body}', '${params.name}', '${params.email}', '${params.product_id}')`;
    return postgres.query(queryString);
  },

  markHelpful: function (params) {
    let queryString = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE id = '${params.question_id}'`;
    return postgres.query(queryString);
  },

  addReport: function (params) {
    let queryString = `UPDATE questions SET reported = true WHERE id = '${params.question_id}'`;
    return postgres.query(queryString);
  }
};

// INNER JOIN photos p ON p.answer_id = a.id