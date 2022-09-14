DROP TABLE IF EXISTS `Answers`;

CREATE TABLE `Answers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(1000) NOT NULL DEFAULT 'NULL',
  `date` VARCHAR(250) NOT NULL DEFAULT 'NULL',
  `answerer_name` VARCHAR NOT NULL DEFAULT 'NULL',
  `helpfulness` INT NOT NULL DEFAULT 0,
  `reported` bit NOT NULL DEFAULT false,
  `id_Questions` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE `Questions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `question_body` VARCHAR(1000) NOT NULL DEFAULT 'NULL',
  `question_date` VARCHAR(250) NULL DEFAULT NULL,
  `asker_name` VARCHAR(250) NOT NULL DEFAULT 'NULL',
  `question_helpfulness` INTEGER NOT NULL DEFAULT 0,
  `reported` bit NOT NULL DEFAULT false,
  `product_id` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR NOT NULL DEFAULT 'NULL',
  `id_Answers` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Answers` ADD FOREIGN KEY (id_Questions) REFERENCES `Questions` (`id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (id_Answers) REFERENCES `Answers` (`id`);