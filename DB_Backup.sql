-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: basic_task
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agent_patient_assignments`
--

DROP TABLE IF EXISTS `agent_patient_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent_patient_assignments` (
  `agentId` int NOT NULL,
  `patientId` int NOT NULL,
  `status` enum('pending','approved','completed') NOT NULL DEFAULT 'pending',
  `assignedAt` datetime NOT NULL,
  `completedAt` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`agentId`,`patientId`),
  UNIQUE KEY `agent_patient_assignments_agentId_patientId_unique` (`agentId`,`patientId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `agent_patient_assignments_ibfk_1` FOREIGN KEY (`agentId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agent_patient_assignments_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_patient_assignments`
--

LOCK TABLES `agent_patient_assignments` WRITE;
/*!40000 ALTER TABLE `agent_patient_assignments` DISABLE KEYS */;
INSERT INTO `agent_patient_assignments` VALUES (12,14,'approved','2024-04-30 13:37:20',NULL,'2024-04-30 13:37:20','2024-04-30 13:37:20'),(13,15,'approved','2024-04-30 14:14:06',NULL,'2024-04-30 14:14:06','2024-04-30 14:14:06');
/*!40000 ALTER TABLE `agent_patient_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `userId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `disease` varchar(255) NOT NULL,
  `details` text,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (14,'Patient 1',30,'Flu','Patient has a fever and cough',1,'2024-04-30 13:36:34','2024-04-30 13:37:20'),(15,'Patient 2',50,'Fever','Patient has a fever.',1,'2024-04-30 14:12:29','2024-04-30 14:14:06');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','agent','patient') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Admin','admin@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$NKuUH4U49trrVzY90/S5ZQ$eidqudKV1vvVdEPka6mIfSSkbFztmrGqM+mEfcmheW8','admin','2024-04-30 11:23:58','2024-04-30 11:23:58'),(12,'Agent 1','agent1@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$bGLdeO/GdZ/66N2UftHCBw$3xhVVe2nw+dXuC1plx5xRuygGfVYFuUCII+92V5nFAg','agent','2024-04-30 11:35:27','2024-04-30 11:35:27'),(13,'Agent 2','agent2@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$/thyDCjyAHzGJdNR/jYDxg$Ip75NSDl+4oZKceDkAF7QSdjPYC16Q6a7yBnG2cSyYk','agent','2024-04-30 11:35:38','2024-04-30 11:35:38'),(14,'Patient 1','patient1@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$XKlK3lEW5rmaEVBXmfAWig$Af+YFJviwB49G2a6BTkWJ4XL6tjmk2CtxFIsB0QA2Vc','patient','2024-04-30 11:36:04','2024-04-30 11:36:04'),(15,'Patient 2','patient2@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$Ho3UNvewqXc5YVMCEPRFTw$MwOuW7Lb040G94b17eXzLMx3RP3UzuyDDr0mO/uP0/Q','patient','2024-04-30 11:36:12','2024-04-30 11:36:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 12:31:07
