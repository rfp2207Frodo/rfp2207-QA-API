const express = require('express');
const router = express.Router();
const questions = require('./controllers/questions.js');
const answers = require('./controllers/answers.js');

router.get('/questions', questions.get);

router.get('/answers', answers.get);

router.post('/postquestion', questions.post);

router.post('/postanswer', answers.post);

router.put('/qhelpfulness', questions.helpfulness);

router.put('/qreport', questions.report);

router.put('/ahelpfulness', answers.helpfulness);

router.put('/areport', answers.report);



module.exports = router;