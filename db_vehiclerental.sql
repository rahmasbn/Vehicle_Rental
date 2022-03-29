-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vehicle_rental
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blacklist_token`
--

DROP TABLE IF EXISTS `blacklist_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklist_token`
--

LOCK TABLES `blacklist_token` WRITE;
/*!40000 ALTER TABLE `blacklist_token` DISABLE KEYS */;
INSERT INTO `blacklist_token` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsIm5hbWUiOiJGYXRpbiIsInJvbGVzIjozLCJpYXQiOjE2NDcxNzQxMDEsImV4cCI6MTY0NzI2MDUwMSwiaXNzIjoiUmFobWEifQ.j_pGmmHXVgt9WUkgBY11cRnQpUROhV2Sk0uUkNmhQcY'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsIm5hbWUiOiJGYXRpbiIsInJvbGVzIjozLCJpYXQiOjE2NDcxODgzNjksImV4cCI6MTY0NzI3NDc2OSwiaXNzIjoiUmFobWEifQ.bPnl0naEZk5op16vT9XjHH9ZSKcyNMbGOMbZPvcqsiM'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsIm5hbWUiOiJGYXRpbiIsInJvbGVzIjozLCJpYXQiOjE2NDcxOTE1NDUsImV4cCI6MTY0NzI3Nzk0NSwiaXNzIjoiUmFobWEifQ.GZMRsv5kTy-LE7g28kL8_2XeUT3UMR95nlKHEk6fe2Q'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsIm5hbWUiOiJyYXZpIiwicm9sZXMiOjIsImlhdCI6MTY0NzI4MTA0NCwiZXhwIjoxNjQ3MzY3NDQ0LCJpc3MiOiJSYWhtYSJ9.7U6VAYdgIpVMQRDTkLzilXGRxHvBgKoIyDOBbo4U_T4');
/*!40000 ALTER TABLE `blacklist_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Jakarta'),(2,'Yogyakarta'),(3,'Bali'),(4,'Bandung'),(5,'Malang'),(6,'Medan'),(7,'Bogor');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'laki-laki'),(2,'perempuan');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'owner/facilitator'),(3,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `quantity` int NOT NULL,
  `start_date` date NOT NULL,
  `return_date` date NOT NULL,
  `total_payment` int NOT NULL,
  `date_added` timestamp(5) NULL DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vehicle_id_idx` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,4,6,1,'2021-11-12','2021-11-13',165000,'2021-11-14 10:07:21.17900','Has been returned',4.0),(2,8,9,2,'2021-11-20','2021-11-21',120000,'2021-11-21 08:17:51.17900','Has been returned',4.5),(3,6,1,1,'2021-10-15','2021-10-17',240000,'2021-10-18 13:07:59.22900','Has been returned',4.5),(4,2,10,1,'2021-08-14','2021-08-15',850000,'2021-08-15 12:49:07.32900','Has been returned',4.9),(5,1,11,1,'2021-09-04','2021-09-05',125000,'2021-09-03 12:49:07.32900','Has been returned',4.2),(6,3,3,1,'2021-12-04','2021-12-05',120000,'2021-12-03 07:29:34.12900','Has been returned',5.0),(7,9,5,1,'2021-06-28','2021-06-30',290000,'2021-06-27 14:58:14.32600','Has been returned',4.7),(8,10,12,1,'2021-07-12','2021-07-13',800000,'2021-07-12 02:08:14.32600','Has been returned',4.5),(9,11,4,3,'2021-11-06','2021-11-07',165000,'2021-11-05 04:18:14.32600','Has been returned',3.9),(10,56,8,1,'2021-11-26','2021-11-28',2300000,'2021-11-25 00:03:54.14600','Has been returned',4.5),(12,4,4,1,'2021-04-13','2021-04-14',165000,'2021-04-12 15:13:23.25600','Has been returned',4.5),(13,1,1,1,'2021-01-01','2021-01-02',16500,'2020-12-30 15:13:23.25600','Has been returned',4.0),(14,56,8,1,'2022-01-01','2022-01-02',1150000,'2021-12-30 05:40:33.25600','Has been returned',4.0),(15,3,14,1,'2021-12-31','2022-01-01',130000,'2021-12-30 02:10:33.25600','Has been returned',4.7),(16,9,28,1,'2022-01-08','2022-01-09',550000,'2022-01-07 14:10:03.13200','Has been returned',4.3),(17,13,30,1,'2021-07-08','2021-07-09',75000,'2021-07-07 23:40:03.13200','Has been returned',4.8),(18,56,23,1,'2021-03-25','2021-03-26',550000,'2021-03-24 09:40:03.13200','Has been returned',4.7),(19,44,30,1,'2022-03-13','2022-03-14',75000,'2022-03-13 17:23:45.12900',NULL,NULL);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'car'),(2,'motorbike'),(3,'bike'),(4,'car'),(5,'motorbike'),(6,'bike'),(7,'car'),(8,'motorbike'),(9,'bike');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
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
  `dob` date DEFAULT NULL,
  `gender_id` int DEFAULT NULL,
  `address` text,
  `phone_number` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `otp` varchar(8) DEFAULT NULL,
  `roles_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_id_idx` (`roles_id`),
  KEY `gender_id_idx` (`gender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Felly','feliciaputri@gmail.com','Fellyp12','2001-06-17',2,'Jalan Iskandar Muda No 9B','082165838311',NULL,NULL,3),(2,'Deva','ahmaddevano@gmail.com','ADeva1*','1998-03-31',1,'Jalan Gatot Subroto No 7','087822163490',NULL,NULL,3),(3,'Zilmiah Adnan','zilmiahadnan@gmail.com','zilm123','1999-11-02',2,'Jalan Perjuangan No 2a','081924246345',NULL,NULL,3),(4,'Muhammad Farhan','mhdfarhan@gmail.com','96farhanMhd','1996-08-27',1,'Jalan Pasar Raya Kintamani No 7','083188364396',NULL,NULL,3),(6,'Zahra','zahraamirah@gmail.com','amirahZh#','2000-10-07',2,'Jalan A. Yani No 23','083189739055',NULL,NULL,3),(8,'Yudha Ananda','anandayudha@gmail.com','Ayudha94','1994-01-21',1,'Jalan Sunda No 8','081368449708',NULL,NULL,3),(9,'Faisal Ahmad','ahmadfaisal@gmail.com','02Faiss','1989-02-28',1,'Jalan Flamboyan Raya Gang Jati No 4','081273645690',NULL,NULL,3),(10,'Alex','alexander@gmail.com','Axel61','1995-09-16',1,'Jalan Fatmawati No 10c','083140361221',NULL,NULL,3),(11,'Fenny Rose','fennyrose@gmail.com','Roze321','1987-04-08',2,'Jalan Cendana Gang Makmur No 31','083173945065',NULL,NULL,3),(13,'Stefhani Putri','stefhaniputri@gmail.com','Steffi21','2002-12-12',2,'Jalan Cendrawasih No 3A','081921876556',NULL,NULL,2),(14,'Rizky','rizkymuhammad@gmail.com','mhd09Rzk','1993-01-12',1,'Jalan Sisingamangaraja No 56','081951053756',NULL,NULL,3),(15,'Fano','fanostevano@gmail.com','123Stevan','1993-05-06',1,'Jalan Imam Bonjol No 180','081630454574',NULL,NULL,2),(37,'vivi','vivi@gmail.com','$2b$10$kwF3R.ULWe/XUI1.DpiVHedCskZvpmDv0o/rv0Wa/J7A1lGTsfMa2','1999-11-04',2,'Jalan Merdeka Barat','083812656578',NULL,NULL,3),(38,'ravi','ravi@gmail.com','$2b$10$ODenNMZxWxGhvvS64r5fvuM4UpVVRHI1XiTUTSFSxCjqc9jGZ5/Qa','1999-11-04',1,'Jalan Merdeka Barat','083812656577','image-1642603627210.jpg',NULL,2),(40,'fadella','fadella@gmail.com','$2b$10$8wS1W70MUsixuBgGZSYrp.yvHJkxp/cOTpAXub3nW5y3fC4COFiXi','2000-01-26',2,'Jalan Turi','083812656725',NULL,NULL,3),(42,'Sari','sari@gmail.com','0','1996-01-09',2,'Jalan Tuba','081267182121',NULL,NULL,3),(43,'Reza','reza@gmail.com','0',NULL,1,NULL,NULL,'public\\image-1640254135154.png',NULL,3),(44,'Fatin','fatin@gmail.com','$2b$10$Pq/6r7B0.QcLiS1cwg0fgOj8/pro0A1YRVEdrYijgaTtdIq6Z8aYa','2000-12-20',2,'jalan fatmawati','081276492822','image-1648097597788.png','599994',3),(49,'Falisha','falisha@gmail.com','$2b$10$/bEmMic2uRjF/5hVGMFmlukIr5ElBxBeSqKvl7WLXSXXiASs1bG5u',NULL,NULL,NULL,NULL,NULL,NULL,3),(55,'Ayu','ayu@gmail.com','$2b$10$mHBho/VUKlmw3PLp8XdeYug6IxcBUyah40NPya4HoW.jcnvU1dlmm',NULL,NULL,NULL,NULL,NULL,NULL,3),(56,'leo','leo@mail.com','$2b$10$XTzYI6tyvNePErFH8iLtBuYHIE6zD8SOq.8l8rDNV1jEsadDYEUtK','2022-01-14',1,'Jalan M.H. Thamrin','081921326788','image-1643024582765.jpg',NULL,3),(57,'Bayu','bayu@gmail.com','0',NULL,NULL,NULL,NULL,NULL,NULL,3),(58,'chika','chika@mail.com','$2b$10$o.9SoFY8rKsMxJTcpDQWAONiv5MdJYB6KqV5aApbDSGpcR3j2515K',NULL,NULL,NULL,NULL,'image-1642606019515.png',NULL,3),(59,'Rahma','rahma@gmail.com','$2b$10$ON7J84X9.fWNRNFbFk99EOAzZwnBg/Bc4L6bs8NAEnqg3UcUf0lqu',NULL,NULL,NULL,NULL,NULL,NULL,1),(60,'Tomi','tomi@gmail.com','$2b$10$SMk0.wz9EL/ReFqN1T0Qielpl3yYhjf99eswZkgm1PWl4Jpu5nSV2',NULL,NULL,NULL,NULL,NULL,NULL,2),(61,'Luthfi','luthfi@gmail.com','$2b$10$aG0BvGLF9xLZklaV5XaXle54NkRAUfyc6A1DtoD6A1hZAn/eRBxx.',NULL,NULL,NULL,NULL,NULL,NULL,2),(62,'Savira','savira@gmail.com','$2b$10$6wahC5TW4oYFsu7OgLbsfOSejhmw4FztEriK.zmOKtkRm5oQZrTwG','2022-01-22',2,'','','image-1642834737889.jpg',NULL,3),(63,'Hanin','hanin@gmail.com','$2b$10$aexkV23TDHnFkRxZUBN2KO1ysUrIrXN1dI0wmxzC6VumU6HvjJYRW',NULL,NULL,NULL,NULL,NULL,NULL,3),(69,'hai','hai@mail.com','$2b$10$suIcZcCVfGfM4caJHgCSYe.F2cGOmlOfL60HSQeN9/nOs3yfKo02S',NULL,NULL,NULL,NULL,NULL,NULL,3),(70,'Sisal','sisal24701@jooffy.com','$2b$10$hJuyS7FG.YzAPh4Mt7BGcOgBasNukhrMEZeOnUrSVfcIr6AZ.G7Ta',NULL,NULL,NULL,NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `stock` int DEFAULT NULL,
  `price` int NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `date_added` timestamp(5) NULL DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `city_id` int NOT NULL,
  `user_id` int NOT NULL,
  `deleted_at` timestamp(5) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id_idx` (`type_id`),
  KEY `city_id_idx` (`city_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `city_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Vespa Matic',2,4,120000,'[\"imgVehicle-1642686900884.jpg\",\"imgVehicle-1642686900888.jpg\",\"imgVehicle-1642686900891.jpg\"]','2021-12-13 09:05:02.30400','Available',2,2,61,NULL),(4,'Onthel',2,10,55000,'[\"imgVehicle-1642687530229.jpg\",\"imgVehicle-1642687530232.jpg\"]','2021-12-13 09:10:02.30400','Available',3,2,61,NULL),(6,'Honda KLX 2020',2,2,165000,'[\"imgVehicle-1642688070328.jpg\",\"imgVehicle-1642688070329.png\"]','2021-12-13 09:11:15.36300','Available',2,3,38,NULL),(7,'Toyota Innova',7,4,650000,'[\"imgVehicle-1647236449486.jpg\"]','2022-03-14 05:40:49.60800','Available',1,4,38,'2022-03-14 18:38:40.34300'),(8,'Toyota Hiace',16,2,1150000,'[\"imgVehicle-1642688175948.jpg\",\"imgVehicle-1642688175959.jpg\",\"imgVehicle-1642688175983.jpg\"]','2021-12-14 12:30:22.12500','Available',1,3,38,NULL),(9,'Sport Bike',1,5,60000,'[\"imgVehicle-1642688203625.jpg\",\"imgVehicle-1642688203648.jpg\",\"imgVehicle-1642688203700.jpg\"]','2021-12-14 12:32:42.37500','Available',3,1,38,NULL),(10,'White Jeep',5,3,850000,'[\"imgVehicle-1642688486430.jpg\",\"imgVehicle-1642688486444.jpg\",\"imgVehicle-1642688486446.jpg\"]','2021-12-14 12:33:07.11500','Available',1,5,38,NULL),(11,'Honda Beat',2,5,125000,'[\"imgVehicle-1642687574921.jpg\",\"imgVehicle-1642687574923.jpeg\"]','2021-12-14 12:34:29.21400','Available',2,2,61,NULL),(12,'Fortuner',7,2,800000,'[\"imgVehicle-1642688611485.jpg\"]','2021-01-05 13:06:09.31200','Available',1,3,38,NULL),(14,'Vario',2,2,130000,'[\"imgVehicle-1642960703820.jpg\",\"imgVehicle-1642960703821.jpg\",\"imgVehicle-1642960703824.jpg\"]','2022-01-23 17:58:23.84500','Available',2,6,60,NULL),(15,'Toyota Avanza',7,3,550000,'[\"imgVehicle-1642689046754.jpg\",\"imgVehicle-1642689046755.jpg\"]','2021-01-05 13:08:19.31200','Available',1,6,60,NULL),(16,'Honda KLX 2000',2,5,155000,'[\"imgVehicle-1642687659042.jpg\",\"imgVehicle-1642687659042.png\"]','2021-01-05 13:09:19.31200','Available',2,2,61,NULL),(19,'Lamborghini',4,1,52000000,'[\"imgVehicle-1642688643147.jpg\",\"imgVehicle-1642688643149.jpg\",\"imgVehicle-1642688643159.jpg\"]','2021-01-05 13:10:19.31200','Available',1,3,38,NULL),(20,'Toyota innova',7,3,600000,'[\"imgVehicle-1642689066991.jpg\",\"imgVehicle-1642689067001.jpeg\"]','2021-01-05 13:11:07.21200','Available',1,5,60,NULL),(21,'Fortuner',7,2,700000,'[\"imgVehicle-1642689083644.jpg\"]','2021-01-05 13:12:07.21200','Available',1,7,60,NULL),(22,'Honda Jazz',5,2,400000,'[\"imgVehicle-1642687715814.jpg\",\"imgVehicle-1642687715839.jpg\"]','2021-01-05 13:13:57.21200','Available',1,2,61,NULL),(23,'Xpander',7,2,550000,'[\"imgVehicle-1642688757068.jpg\",\"imgVehicle-1642688757070.jpg\"]','2021-01-05 13:15:07.20200','Available',1,1,38,NULL),(24,'Toyota Rush',7,3,800000,'[\"imgVehicle-1642688842160.jpg\",\"imgVehicle-1642688842173.jpg\"]','2021-01-05 13:16:07.20200','Available',1,1,38,NULL),(25,'Ayla',5,3,375000,'[\"imgVehicle-1642687788993.jpg\",\"imgVehicle-1642687788993.jpg\"]','2021-01-05 13:19:07.20200','Available',1,6,61,NULL),(26,'Toyota Calya',7,3,350000,'[\"imgVehicle-1642688883981.jpg\",\"imgVehicle-1642688883982.jpg\"]','2021-01-06 10:02:34.36200','Available',1,2,38,NULL),(27,'Xenia',7,2,600000,'[\"imgVehicle-1642688042309.jpg\",\"imgVehicle-1642688042310.jpg\"]','2021-01-06 10:03:34.36200','Available',1,3,61,NULL),(28,'Toyota Avanza',7,2,550000,'[\"imgVehicle-1642688912388.jpg\",\"imgVehicle-1642688912389.jpg\"]','2021-01-06 10:05:04.31900','Available',1,7,38,NULL),(29,'Toyota Yaris',5,3,425000,'[\"imgVehicle-1642689132865.jpg\",\"imgVehicle-1642689132885.jpg\"]','2021-01-06 10:07:21.17900','Available',1,4,60,NULL),(30,'Fixie',1,4,75000,'[\"imgVehicle-1642688963768.jpg\",\"imgVehicle-1642688963828.jpg\",\"imgVehicle-1642688963848.jpg\"]','2021-01-15 12:13:41.32900','Available',3,7,38,NULL),(31,'Fixie Gray',1,2,78000,'[\"imgVehicle-1642689160303.jpg\",\"imgVehicle-1642689160312.jpg\",\"imgVehicle-1642689160346.jpg\"]','2021-01-15 12:15:41.32900','Available',3,3,60,NULL),(57,'w',7,1,550000,'[\"imgVehicle-1643000859425.jpg\"]','2022-01-24 05:07:39.45200','Available',1,3,60,NULL),(58,'d',1,1,2,'[\"imgVehicle-1643009618437.jpeg\"]','2022-01-24 07:33:38.48300','Available',1,1,38,'2022-03-14 17:52:53.40000'),(59,'s',1,1,1,'[\"imgVehicle-1643010291723.jpg\",\"imgVehicle-1643010291726.jpg\",\"imgVehicle-1643010291729.jpg\"]','2022-01-24 07:44:51.79000','Available',1,1,38,'2022-03-14 18:56:51.56800'),(60,'avanza',7,2,550000,'[\"imgVehicle-1643076806312.jpg\",\"imgVehicle-1643076806319.jpg\",\"imgVehicle-1643076806323.jpg\"]','2022-01-25 02:13:26.36300','Available',1,3,38,'2022-03-14 18:58:00.97100'),(61,'Brio',7,4,550000,'[\"imgVehicle-1645365413794.jpg\",\"imgVehicle-1645365413798.jpg\"]','2022-02-20 13:56:53.84300','Available',1,5,38,NULL),(62,'Dummy',5,2,350000,'[\"imgVehicle-1647234282227.jpg\"]','2022-03-14 05:04:42.26200','Available',1,7,38,NULL),(63,'Cars',2,2,300000,'[\"imgVehicle-1648094681094.png\",\"imgVehicle-1648094681107.jpg\"]','2022-03-24 04:04:41.13100','Available',1,1,38,NULL);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-29 10:44:32
