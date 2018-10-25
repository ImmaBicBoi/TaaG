drop database orgchartdb;
create database orgchartdb;

use orgchartdb;

/******************************************************/
/***********       POSITION             ***************/
/******************************************************/

drop table if exists POSITION;

create table POSITION (
	POSITION_ID int NOT NULL AUTO_INCREMENT,
	POSITION_NAME varchar(30) NOT NULL UNIQUE,
	PARENT_POS_ID int(10),
	PERSON_ID int(10) UNIQUE,
	JOB_ID varchar(20) UNIQUE,
	
	PRIMARY KEY (POSITION_ID),
    KEY FK_PERSON (PERSON_ID)
	
);

/* INSERT DUMMY DATA INTO POSITION TABLE */

insert into POSITION (POSITION_NAME,PARENT_POS_ID,PERSON_ID,JOB_ID) values 
('CTO',NULL ,NULL,'AA-009'),
('CEO',NULL ,NULL,'AA-010'),
('Deputy Director',NULL ,NULL,'AA-011'),
('VP',NULL ,NULL,'AA-008'),
('Project Manager',NULL ,NULL,'AA-007'),
('Architect',NULL ,NULL,'AA-006'),
('Developer',NULL ,NULL,'AA-005'),
('Scrum Master',NULL ,NULL,'AA-004'),
('QA Tester',NULL ,NULL,'AA-003'),
('Technical Writer',NULL ,NULL,'AA-002');
/******************************************************/
/***********       POSITION ATTRIBUTES  ***************/
/******************************************************/

drop table if exists POSITION_ATTRIBUTE;

create table POSITION_ATTRIBUTE (
	POS_ATTR_ID int NOT NULL AUTO_INCREMENT,
	POS_ATTR_KEY varchar(255),
	POS_ATTR_VALUE varchar(255),
	POSITION_ID int (10) NOT NULL ,
	
	PRIMARY KEY (POS_ATTR_ID),
    KEY FK_POSITION (POSITION_ID)
	);
	
/* INSERT DUMMY DATA INTO POSITION ATTRIBUTE TABLE */

insert into POSITION_ATTRIBUTE (POS_ATTR_KEY,POS_ATTR_VALUE,POSITION_ID) values 
('Type','Full Time',1),
('Base Pay','$ 250,000',1),
('Type','Full Time',2),
('Type','Full Time',3),
('Type','Full Time',4),
('Type','Full Time',5),
('Type','Full Time',6),
('Years of experience','8 years',6),
('Type','Full Time',7),
('Programming Language skill','Java',7),
('Type','Full Time',8),
('Type','Full Time',9),
('Type','Part Time',10);

/******************************************************/
/**************       PERSON            ***************/
/******************************************************/

drop table if exists PERSON;

create table PERSON (
	PERSON_ID int NOT NULL AUTO_INCREMENT,
	PERSON_FNAME varchar(255) NOT NULL, 
	PERSON_LNAME varchar(255) NOT NULL,
	EMPLOYEE_ID varchar(20) UNIQUE,
	
	PRIMARY KEY (PERSON_ID)
);

/* INSERT DUMMY DATA INTO PERSON TABLE */

insert into PERSON (PERSON_FNAME,PERSON_LNAME,EMPLOYEE_ID ) values 
('Frank','Ellison','E500689'),
('Sarah','Mitchell','E500713'),
('John','White', 'E500952'),
('Rachel','Green', 'E500414'),
('Jacob','Bing', 'E500209'),
('Sally','North', 'E500761'),
('Peter','Clark', 'E500085'),
('Lisa','Ross', 'E500451'),
('Oliver','Hunter', 'E500983'),
('Jason','Murray', 'E500949');

/******************************************************/
/**************     PERSON ATTRIBUTES   ***************/
/******************************************************/

drop table if exists PERSON_ATTRIBUTE;

create table PERSON_ATTRIBUTE (
	PER_ATTR_ID int NOT NULL AUTO_INCREMENT,
	PER_ATTR_KEY varchar(255),
	PER_ATTR_VALUE varchar(255),
	PERSON_ID int (10) NOT NULL ,
	
	PRIMARY KEY (PER_ATTR_ID),
    KEY FK_PERSON (PERSON_ID)
);

/* INSERT DUMMY DATA INTO PERSON ATTRIBUTE TABLE */

insert into PERSON_ATTRIBUTE (PER_ATTR_KEY,PER_ATTR_VALUE,PERSON_ID ) values 
('Email','frank.ellison@gmail.com',1),
('Office','Fairfield, CT',1),
('Email','sarah.mitchell@gmail.com',2),
('Address','Main Ave, Stamford', 3),
('Email','rachel.green@gmail.com', 4),
('Mobile Number','728-584-7730', 5),
('DOB','06-09-1987', 6),
('Email','peter.clark@gmail.com', 7),
('Contact Number','257-317-9134', 7),
('DOB','3-02-1990', 8),
('Address','Belden Ave, Fairfield',9),
('Email','jason.murray@gmail.com', 10);

/******************************************************/

