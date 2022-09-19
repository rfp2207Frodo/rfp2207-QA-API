const models = require('../models/answers.js');

module.exports = {
  get: function(req, res) {
    let query = req.query;
    // console.log(query);
    models.getAnswers(query)
      .then((results) => {
        // console.table(results.rows);
        res.send({question: query.question_id, page: query.page, count: query.count, results: results.rows});
      })
      .catch((err) => (console.log('Error with controllers (a)')))
  }
};