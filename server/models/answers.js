const postgres = require ('../db/index.js');
const Promise = require ('bluebird');

module.exports = {
  getAnswers: function (params) {
    let queryString =
    `SELECT a.id as answer_id, body, date, answerer_name, helpfulness,
      COALESCE (json_agg(json_build_object('id', p.id, 'url', p.url)) FILTER (WHERE p.id IS NOT NULL), '[]') photos
    FROM answers a
    LEFT JOIN photos p ON p.answer_id = a.id
    WHERE a.question_id = ${params.question_id} AND a.reported = false
    GROUP BY a.id
    LIMIT ${params.count} OFFSET ${(params.page - 1) * params.count}`;
    return postgres.query(queryString);
  },

  postAnswer: function(params) {
    let queryString = `WITH first_post as (
      INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ('${params.question_id}', '${params.body}', '${params.name}', '${params.email}') RETURNING id
    )
    INSERT INTO photos (answer_id, url) VALUES ((SELECT id from first_post), unnest(array${params.photos}))`;
    return postgres.query(queryString);
  },

  markHelpful: function (params) {
    let queryString = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = '${params.answer_id}'`;
    return postgres.query(queryString);
  },

  addReport: function (params) {
    let queryString = `UPDATE answers SET reported = true WHERE id = '${params.answer_id}'`;
    return postgres.query(queryString);
  }
};
