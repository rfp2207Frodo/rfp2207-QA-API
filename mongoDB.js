const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fethcer');

let QASchema = new mongoose.Schema ({
  question_id: {type: Number, unique: true},
  product_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: {type: Number, default: 0},
  reported: {type: Boolean, default: false},
  answers: [
    {
      answer_id: Number,
      body: String,
      date: String,
      answerer_name: String,
      helpfulness: {type: Number, default: 0},
      reported: {type: Boolean, default: false},
      photos: [
        {
          photo_id: Number,
          url: String,
        },
        ...
      ]
    },
    ...
  ]
})

let Repo = mongoose.model('Repo', QASchema);
