CREATE DATABASE `sandle_room` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientUserId` int NOT NULL,
  `hostUserId` int NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `title` mediumtext,
  `notes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `hostUserId_idx` (`hostUserId`),
  KEY `clientUserId_idx` (`clientUserId`),
  CONSTRAINT `clientUserId` FOREIGN KEY (`clientUserId`) REFERENCES `users` (`id`),
  CONSTRAINT `hostUserId` FOREIGN KEY (`hostUserId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hostId` int NOT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime NOT NULL,
  `available` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `hostId_idx` (`hostId`),
  CONSTRAINT `hostId` FOREIGN KEY (`hostId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `default_availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hostId` int NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `weekday` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `hostId_idx` (`hostId`),
  CONSTRAINT `default_hostId` FOREIGN KEY (`hostId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `patient_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phoneNumber` int NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `postalCode` varchar(45) DEFAULT NULL,
  `birthDate` datetime NOT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `guardian` varchar(45) DEFAULT NULL,
  `emergencyContact` varchar(45) NOT NULL,
  `emergencyContactPhone` int NOT NULL,
  `emergencyContactRelationship` varchar(45) NOT NULL,
  `occupation` varchar(45) DEFAULT NULL,
  `previousCounselling` mediumtext,
  `relevantInfo` mediumtext,
  `goals` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `patient_user_id_UNIQUE` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` int DEFAULT NULL,
  `role` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
