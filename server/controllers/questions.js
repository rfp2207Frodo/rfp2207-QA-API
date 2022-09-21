const models = require('../models/questions.js');

module.exports = {
  get: function(req, res) {
    let query = req.query;
    models.getQuestions(query)
      .then((results) => {
        res.send({product_id: query.product_id, results: results});
      })
      .catch((err) => (console.log('Error with controllers')))
  },

  post: function(req, res) {
    models.postQuestion(req.query)
      .then (() => {
        res.sendStatus(201);
      })
      .catch ((err) => {
        res.sendStatus(500);
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