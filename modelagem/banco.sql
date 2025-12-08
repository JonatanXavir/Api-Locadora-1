-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema locadora_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema locadora_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `locadora_db` DEFAULT CHARACTER SET utf8 ;
USE `locadora_db` ;

-- -----------------------------------------------------
-- Table `locadora_db`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locadora_db`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `telefone` VARCHAR(15) NULL,
  `endereco` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `locadora_db`.`filme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locadora_db`.`filme` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `genero` VARCHAR(100) NOT NULL,
  `ano_lancamento` INT NOT NULL,
  `disponivel` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `locadora_db`.`aluguel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `locadora_db`.`aluguel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_aluguel` DATETIME NOT NULL,
  `data_devolucao_prevista` DATETIME NOT NULL,
  `data_devolucao_real` DATETIME NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `cliente_id` INT NULL,
  `filme_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_aluguel_cliente_idx` (`cliente_id` ASC),
  INDEX `fk_aluguel_filme_idx` (`filme_id` ASC),
  CONSTRAINT `fk_aluguel_cliente`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `locadora_db`.`cliente` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluguel_filme`
    FOREIGN KEY (`filme_id`)
    REFERENCES `locadora_db`.`filme` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- (Opcional) Adicionar aqui dados iniciais para as novas tabelas

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
