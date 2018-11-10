DROP DATABASE IF EXISTS `movie_app`;
CREATE DATABASE `movie_app`;
USE `movie_app`;

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT,
    `name` VARCHAR(128) UNIQUE NOT NULL,
    `email` VARCHAR(128) UNIQUE NOT NULL,
    `avatar` VARCHAR(128),
    `about` TEXT,
    `password` BINARY(60) NOT NULL,
    PRIMARY KEY (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

CREATE TABLE `bookmart` (
    `user_id` INT,
    `movie_id` INT, 
    `opinion` ENUM('LIKE', 'DISLIKE'),
    UNIQUE(`user_id`, `movie_id`),
    FOREIGN KEY (`user_id`) REFERENCES user (`id`)
);

CREATE TABLE `session` (
    `id` VARCHAR(128) NOT NULL,
    `expires` INT NOT NULL,
    `data` TEXT,
    PRIMARY KEY (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
