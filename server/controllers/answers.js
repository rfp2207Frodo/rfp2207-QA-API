const models = require('../models/answers.js');

module.exports = {
  get: function(req, res) {
    let query = req.query;
    models.getAnswers(query)
      .then((results) => {
        res.send({question: query.question_id, page: query.page, count: query.count, results: results.rows});
      })
      .catch((err) => (console.log('Error with controllers (a)')))
  },

  post: function(req, res) {
    models.postAnswer(req.query)
      .then (() => {
        res.sendStatus(201);
      })
      .catch ((err) => {
        res.sendStatus(500)
      })
  },

  helpfulness: function(req, res) {
    models.markHelpful(req.query)
      .then (() => {
        res.sendStatus(204);
      })
      .catch ((err) => {
        res.sendStatus(500);
      })
  },

  report: function(req, res) {
    models.addReport(req.query)
      .then (() => {
        res.sendStatus(204);
      })
      .catch ((err) => {
        res.sendStatus(500);
      })
  }
};