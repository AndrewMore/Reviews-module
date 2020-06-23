DROP DATABASE IF EXISTS reviewModule;

CREATE DATABASE reviewModule;

USE reviewModule;

CREATE TABLE users(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  passHash VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  ageRange VARCHAR(100),
  place VARCHAR(255),
  skinType VARCHAR(255),
  skinShade VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE reviews(
  id INT AUTO_INCREMENT NOT NULL,
  productId INT NOT NULL,
  productName VARCHAR(255),
  user_id INT,
  reviewTitle VARCHAR(255),
  reviewText TEXT,
  rating FLOAT (2, 1) NULL,
  bottomLine VARCHAR(200),
  helpfulPeeps VARCHAR(100),
  reviewTime VARCHAR(100),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  PRIMARY KEY(id)
);