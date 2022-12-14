const postgres = require ('../db/index.js');

module.exports = {
  getQuestions: function (params) {
    let queryString =
    `SELECT id AS question_id, question_body, question_date, asker_name, question_helpfulness FROM questions
    WHERE product_id = ${params.product_id} AND reported = false
    LIMIT ${params.count} OFFSET ${(params.page - 1) * params.count}`;

    function mapAnswers (answer) {
      let answerQueryString =
      `SELECT id, url FROM photos
      WHERE answer_id = ${answer.id}`;

      return postgres.query(answerQueryString)
      .then((results) => {
        if (results.rows.length === 0) {
          answer.photos = [];
        } else {
          answer.photos = results.rows;
        }
        return answer;
      });
    };

    function mapQuestions (question) {
      let questionQueryString =
      `SELECT id, body, date, answerer_name, helpfulness FROM answers
      WHERE question_id = ${question.question_id} AND reported = false LIMIT 5`;

      question.answers = {};
      return postgres.query(questionQueryString)
      .then((results) => {
        return Promise.all(results.rows.map(mapAnswers));
      })
      .then((answers) => {
        for (let i = 0; i < answers.length; i++) {
          question.answers[answers[i].id] = answers[i];
        }
        return question;
      })
    };

    return postgres.query(queryString)
      .then(async (results) => {
        let rows = await Promise.all(results.rows.map(mapQuestions))
        return rows;
      })
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
