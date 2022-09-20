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
    // ${params.question_id}
    // ${params.count}
  },

  postAnswer: function(params) {
    console.log(params.photos);
    let queryString = `WITH first_post as (
      INSERT INTO answers (question_id, abody, answerer_name, answerer_email) VALUES ('${params.question_id}', '${params.body}', '${params.name}', '${params.email}') RETURNING id
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

// let date = new Date(0);
// date.setUTCSeconds(parseInt(review.date));

// (SELECT * FROM answers WHERE question_id = 1 LIMIT 5) UNION (SELECT (json_agg(json_build_object('id', id, 'url', url))) as photos FROM photos where answer_id = );

// `WITH first_post as (
//   INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ('5', 'Wow', 'Andy', 'love@gmail.com') RETURNING id
// )
// INSERT INTO photos (answer_id, url) VALUES ((SELECT id from first_post), unnest(array['hello', 'wow']))`

// SELECT a.id as a.answer_id, a.body, a.date, a.answerer_name, a.helpfulness, COALESCE (json_agg(json_build_object(id, p.id, url, p.url), []) as photos FROM answers a INNER JOIN photos p ON p.answer_id = a.id WHERE a.question_id = 34 AND a.reported = false GROUP BY a.id LIMIT 5

// `SELECT json_build_object('answer_id', a.id, 'body', a.body, 'date' a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos' COALESCE (json_agg(json_build_object('id', p.id, 'url', p.url)) FILTER (WHERE p.id IS NOT NULL), '[]'::JSON)
//     FROM answers a
//     INNER JOIN photos p ON p.answer_id = a.id
//     WHERE a.question_id = ${params.question_id} AND a.reported = false
//     GROUP BY a.id
//     LIMIT ${params.count}`