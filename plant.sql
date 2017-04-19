-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema plantDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema plantDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `plantDB` DEFAULT CHARACTER SET utf8 ;
USE `plantDB` ;

-- -----------------------------------------------------
-- Table `plantDB`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantDB`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sessionID` VARCHAR(255) NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `permission_level` INT NULL,
  `money` MEDIUMTEXT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));


-- -----------------------------------------------------
-- Table `plantDB`.`plant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantDB`.`plant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  `stage` INT NULL,
  `user_id` INT NOT NULL,
  `guide` LONGTEXT NULL,
  `age_days` INT NULL,
  `seeds` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_plant_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_plant_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `plantDB`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plantDB`.`plant_action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantDB`.`plant_action` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `health` INT NULL,
  `plant_id` INT NOT NULL,
  `seeds` INT NULL,
  `type` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`, `plant_id`),
  INDEX `fk_plant_action_plant1_idx` (`plant_id` ASC),
  CONSTRAINT `fk_plant_action_plant1`
    FOREIGN KEY (`plant_id`)
    REFERENCES `plantDB`.`plant` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plantDB`.`offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantDB`.`offer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seeds` INT NULL,
  `user_id` INT NOT NULL,
  `plant_id` INT NOT NULL,
  `recipient_id` INT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`, `user_id`, `plant_id`),
  INDEX `fk_offer_user1_idx` (`user_id` ASC),
  INDEX `fk_offer_plant1_idx` (`plant_id` ASC),
  CONSTRAINT `fk_offer_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `plantDB`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_offer_plant1`
    FOREIGN KEY (`plant_id`)
    REFERENCES `plantDB`.`plant` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
