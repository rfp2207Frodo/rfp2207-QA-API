const express = require('express');
const router = express.Router();
const questions = require('./controllers/questions.js');
const answers = require('./controllers/answers.js');

router.get('/questions', questions.get);

router.get('/answers', answers.get);

router.post('/postquestion', questions.post);

module.exports = router;