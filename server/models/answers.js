const postgres = require ('../db/index.js');
const Promise = require ('bluebird');

module.exports = {
  getAnswers: function (params) {
    let queryString = `SELECT a.id as answer_id, body, date, answerer_name, helpfulness, COALESCE (json_agg(json_build_object('id', p.id, 'url', p.url)), '[]') as photos
    FROM answers a
    INNER JOIN photos p ON p.answer_id = a.id
    WHERE a.question_id = ${params.question_id} AND a.reported = false
    GROUP BY a.id
    LIMIT ${params.count}`
    return postgres.query(queryString);
    // ${params.question_id}
    // ${params.count}
  }

  // postAnswers: function(params) {
  //   let queryString1 = `INSERT INTO answers (question_id, body, answerer_name, answe) VALUES ('${params.body}', '${params.name}', '${params.email}', '${params.product_id}')``
  // }
};



// SELECT a.id as a.answer_id, a.body, a.date, a.answerer_name, a.helpfulness, COALESCE (json_agg(json_build_object(id, p.id, url, p.url), []) as photos FROM answers a INNER JOIN photos p ON p.answer_id = a.id WHERE a.question_id = 34 AND a.reported = false GROUP BY a.id LIMIT 5