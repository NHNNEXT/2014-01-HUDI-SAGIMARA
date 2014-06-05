drop database if exists sagimara;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `sagimara` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `sagimara` ;

-- -----------------------------------------------------
-- Table `sagimara`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`USER` (
  `user_phone` VARCHAR(20) NOT NULL,
  `user_verification` VARCHAR(20) NULL,
  `user_status` TINYINT NULL,
  `user_area` VARCHAR(45) NULL,
  PRIMARY KEY (`user_phone`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`LOCATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`LOCATION` (
  `location_num` INT NOT NULL AUTO_INCREMENT,
  `USER_user_phone` VARCHAR(20) NULL,
  `location_time` DATETIME NULL,
  `location_coordinate` VARCHAR(45) NULL,
  INDEX `fk_LOCATION_USER1_idx` (`USER_user_phone` ASC),
  PRIMARY KEY (`location_num`),
  CONSTRAINT `fk_LOCATION_USER1`
    FOREIGN KEY (`USER_user_phone`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sagimara`.`VIDEO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`VIDEO` (
  `USER_user_phone` VARCHAR(20) NOT NULL,
  `video_link` VARCHAR(100) NULL,
  `video_date` DATETIME NULL,
  UNIQUE INDEX `videolink_UNIQUE` (`video_link` ASC),
  INDEX `fk_VIDEO_USER1_idx` (`USER_user_phone` ASC),
  PRIMARY KEY (`USER_user_phone`),
  CONSTRAINT `fk_VIDEO_USER1`
    FOREIGN KEY (`USER_user_phone`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`INQUIRY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`INQUIRY` (
  `inquiry_num` INT NOT NULL AUTO_INCREMENT,
  `USER_user_phone` VARCHAR(20) NOT NULL,
  `inquiry_time` DATE NULL,
  INDEX `fk_INQUIRY_USER1_idx` (`USER_user_phone` ASC),
  PRIMARY KEY (`inquiry_num`),
  CONSTRAINT `fk_INQUIRY_USER1`
    FOREIGN KEY (`USER_user_phone`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `sagimara`.`TRADE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`TRADE` (
  `trade_id` INT NOT NULL,
  `USER_seller` VARCHAR(20) NOT NULL,
  `USER_buyer` VARCHAR(20) NOT NULL,
  `trade_category` VARCHAR(45) NOT NULL,
  `trade_status` TINYINT NULL,
  `trade_link` VARCHAR(45) NULL,
  `trade_detail` TEXT NULL,
  `trade_date` DATETIME NULL,
  PRIMARY KEY (`trade_id`),
  INDEX `fk_TRADE_USER1_idx` (`USER_seller` ASC),
  INDEX `fk_TRADE_USER2_idx` (`USER_buyer` ASC),
  UNIQUE INDEX `trade_category_UNIQUE` (`trade_category` ASC),
  CONSTRAINT `fk_TRADE_USER1`
    FOREIGN KEY (`USER_seller`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRADE_USER2`
    FOREIGN KEY (`USER_buyer`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`CATEGORY` (
  `category_id` VARCHAR(45) NOT NULL,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`),
  CONSTRAINT `fk_CATEGORY_TRADE1`
    FOREIGN KEY (`category_id`)
    REFERENCES `sagimara`.`TRADE` (`trade_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`WATCH`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`WATCH` (
  `watch_from` VARCHAR(20) NOT NULL,
  `watch_to` VARCHAR(20) NOT NULL,
  `watch_time` DATETIME NOT NULL,
  PRIMARY KEY (`watch_to`, `watch_from`),
  INDEX `fk_WATCH_from_to_idx` (`watch_from` ASC),
  CONSTRAINT `fk_WATCH_from`
    FOREIGN KEY (`watch_from`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_WATCH_to`
    FOREIGN KEY (`watch_to`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`NOTIFICATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`NOTIFICATION` (
  `notifty_from` VARCHAR(20) NOT NULL,
  `notify_to` VARCHAR(20) NOT NULL,
  `notify_time` DATETIME NULL,
  `notify_detail` TEXT NULL,
  PRIMARY KEY (`notify_to`, `notifty_from`),
  INDEX `fk_NOTI_from_idx` (`notifty_from` ASC),
  CONSTRAINT `fk_NOTI_from`
    FOREIGN KEY (`notifty_from`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_NOTI_to`
    FOREIGN KEY (`notify_to`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`VERIFICATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`VERIFICATION` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `USER_user_phone` VARCHAR(20) NOT NULL,
  `user_status` TINYINT NULL,
  `verification_time` DATETIME NULL,
  INDEX `fk_VERIFICATION_USER1_idx` (`USER_user_phone` ASC),
  PRIMARY KEY (`num`),
  CONSTRAINT `fk_VERIFICATION_USER1`
    FOREIGN KEY (`USER_user_phone`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sagimara`.`REQUEST`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`REQUEST` (
  `request_from` VARCHAR(20) NOT NULL,
  `request_to` VARCHAR(20) NOT NULL,
  `request_date` DATETIME NOT NULL,
  PRIMARY KEY (`request_to`, `request_from`),
  INDEX `fk_REQUEST_USER1_idx` (`request_from` ASC),
  INDEX `fk_REQUEST_USER2_idx` (`request_to` ASC),
  CONSTRAINT `fk_REQUEST_USER1`
    FOREIGN KEY (`request_from`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_REQUEST_USER2`
    FOREIGN KEY (`request_to`)
    REFERENCES `sagimara`.`USER` (`user_phone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
;

-- -----------------------------------------------------
-- Table `sagimara`.`ADMIN`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sagimara`.`ADMIN` (
  `admin_id` VARCHAR(12) NOT NULL,
  `admin_password` VARCHAR(32) NULL,
  `admin_name` VARCHAR(45) NULL,
  `admin_email` VARCHAR(45) NULL,
  `admin_status` TINYINT NULL,
  PRIMARY KEY (`admin_id`))
ENGINE = InnoDB
;

-- -----------------------------------------------------
-- View `sagimara`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sagimara`.`view1`;
USE `sagimara`;
CREATE  VIEW `USER_PROFILE` AS
    SELECT 
        u.user_phone AS 'phone_number',
        u.user_status AS 'status',
        u.user_verification AS 'verification',
        u.user_area AS 'location',
        count(w.watch_to) AS 'watch' ,
        count(n.notify_to) AS 'notify'
	from
        USER AS u
            left JOIN
        WATCH AS w ON (u.user_phone = w.watch_to)
            left JOIN
        NOTIFICATION AS n ON (u.user_phone = n.notify_to)
	group by u.user_phone
;

-- -----------------------------------------------------
-- View `sagimara`.`view2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sagimara`.`view2`;
USE `sagimara`;
CREATE  VIEW `USER_INQUIRY` AS
    SELECT 
        USER_user_phone AS 'phone_number',
		count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 6 DAY),inquiry_time,null))  AS '6day ago',
		count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 5 DAY),inquiry_time,null))  AS '5day ago',
		count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 4 DAY),inquiry_time,null))  AS '4day ago',
		count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 3 DAY),inquiry_time,null))  AS '3day ago',
		count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 2 DAY),inquiry_time,null))  AS '2day ago',
		count(if(inquiry_time=(CURRENT_DATE()-INTERVAL 1 DAY),inquiry_time,null))  AS '1day ago',
		count(if(inquiry_time=(CURRENT_DATE()),inquiry_time,null))  AS 'today'

    FROM
        INQUIRY 

	group by USER_user_phone
;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
