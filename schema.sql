\c postgres;

DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa;

-- ---
-- Table 'Questions'
--
-- ---

CREATE TABLE questions (
  "id" SERIAL,
  "product_id" INTEGER NOT NULL,
  "question_body" VARCHAR(1000) NOT NULL DEFAULT 'NULL',
  "question_date" VARCHAR(250) NULL DEFAULT NOW(),
  "asker_name" VARCHAR(250) NOT NULL DEFAULT 'NULL',
  "asker_email" VARCHAR (250) NOT NULL DEFAULT 'NULL',
  "reported" BOOLEAN NOT NULL DEFAULT false,
  "question_helpfulness" INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY ("id")
);

-- ---
-- Table 'Answers'
--
-- ---

CREATE TABLE answers (
  "id" SERIAL,
  "question_id" INTEGER NOT NULL,
  "body" VARCHAR(1000) NOT NULL DEFAULT 'NULL',
  "date" VARCHAR (250) NOT NULL DEFAULT NOW(),
  "answerer_name" VARCHAR (250) NOT NULL DEFAULT 'NULL',
  "answerer_email" VARCHAR (250) NOT NULL DEFAULT 'NULL',
  "reported" BOOLEAN NOT NULL DEFAULT false,
  "helpfulness" INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY ("id")
);

-- ---
-- Table 'Photos'
--
-- ---

CREATE TABLE photos (
  "id" SERIAL,
  "answer_id" INTEGER NOT NULL,
  "url" VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY ("id")
);

\copy questions(id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM './data/questions.csv' DELIMITER ',' CSV HEADER;

\copy answers(id, question_id, body, "date", answerer_name, answerer_email, reported, helpfulness) FROM './data/answers.csv' DELIMITER ',' CSV HEADER;

\copy photos(id, answer_id, "url") FROM './data/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('questions_id_seq', max(id)) FROM questions;

SELECT setval('answers_id_seq', max(id)) FROM answers;

SELECT setval('photos_id_seq', max(id)) FROM photos;

UPDATE questions SET question_date = to_timestamp(question_date::numeric / 1000);

UPDATE answers SET "date" = to_timestamp("date"::numeric / 1000);

CREATE INDEX q_pid ON questions(product_id);

CREATE INDEX a_qid ON answers(question_id);

CREATE INDEX p_aid ON photos(answer_id);



