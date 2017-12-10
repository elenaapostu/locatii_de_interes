SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE `locatii_de_interes`;
USE locatii_de_interes;

--Creare tabela tara

 create table if not exists `tara`
 (`id` int not null auto_increment,
 `nume_tara` varchar(20) default null,
 `regiune` varchar(25) default null,
 `limba_oficiala` varchar(15) default null,
 `capitala` varchar(20) default null,
 `moneda_oficiala` varchar(20) default null, 
 `createdAt` timestamp,
 `updatedAt` timestamp,
 primary key (id))ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


--Creare tabela oras

create table if not exists `oras`
(`id` int not null auto_increment,
 `id_tara` int default null,
 `nume_oras` varchar(25) default null,
 `data_calatorie` varchar(10) default null,
 `obiective_turistice` varchar(150) default null,
 `descriere` varchar(150) default null,
 `fotografii` varchar(500) default null,
 `createdAt` timestamp,
 `updatedAt` timestamp,
 primary key(id), 
 foreign key(id_tara) references tara(id))ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
