DROP DATABASE IF EXISTS `dbname`;
CREATE DATABASE `dbname`;
USE `dbname`;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `userId` INT(11) NOT NULL AUTO_INCREMENT,
  `userName` TEXT NOT NULL,
  `email` TEXT,
  `password` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
);

DROP TABLE IF EXISTS `Food`;
CREATE TABLE `Food` (
  `foodId` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `foodName` TEXT NOT NULL,
  `foodImageUrl` TEXT,
  `isSoldOut` BOOLEAN NOT NULL DEFAULT FALSE,
  `expirationDate` DATE,
  `quantity` FLOAT,
  `unit` TEXT,
  `description` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`foodId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE
);
