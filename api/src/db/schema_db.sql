DROP DATABASE IF EXISTS test_dealers_db;
CREATE DATABASE IF NOT EXISTS test_dealers_db;

use test_dealers_db;

create table Users (
	id int primary key auto_increment,
    firstName varchar(128) not null,
    lastName varchar(128) not null,
    email varchar(50) not null unique,
    password varchar(256) not null,
    age tinyint not null default 0
);

create table Admins (
	id int primary key auto_increment,
    userId int not null,
    status boolean not null default 1,
    constraint fk_admin_user foreign key(userId)
        references Users(id) on delete cascade on update cascade
);

create table Dealers (
	id int primary key auto_increment,
    name varchar(128) not null default '' unique,
    userId int not null,
    status boolean not null default 1,
    constraint fk_dealers_users foreign key(userId)
		references Users(id) on update cascade
);

create table CarBrands (
	id int primary key auto_increment,
    name varchar(128) not null default ''
);

create table CarBrand_Models (
	id int primary key auto_increment,
    name varchar(128) not null default '',
    brandId int not null,
	constraint fk_model_manufacture foreign key(brandId)
		references CarBrands(id) on update cascade on delete cascade
);

create table Cars (
	id int primary key auto_increment,
	year int not null default 0,
	color varchar(50) not null default '',
    carModelId int not null,
    createdById int not null,
    createdAt datetime not null default current_timestamp,
	constraint fk_car_model_manufacture foreign key(carModelId)
		references CarBrand_Models(id) on update cascade on delete cascade,
	constraint fk_car_user foreign key(createdById)
		references Users(id) on update cascade
);

create table Dealer_Cars (
    dealerId int not null,
    carId int not null,
    constraint pk_dealer_cars primary key(dealerId, carId),
    constraint fk_dealerCars_dealer foreign key(dealerId)
        references Dealers(id) on update cascade on delete cascade,
    constraint fk_dealerCars_car foreign key(carId)
        references Cars(id) on update cascade on delete cascade
)