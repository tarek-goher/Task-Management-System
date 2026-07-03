create database  savForm ;
create table  savDate(
      id INT AUTO_INCREMENT PRIMARY KEY ,
    name varchar(255) not null,
    email varchar(50) not null
);




create database register ; 
create table saveRegister (
id SERIAL PRIMARY KEY,
name varchar(250) NOT NULL , 
age INT not null , 
email varchar(255) not null unique ,
password varchar(255) not null ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);