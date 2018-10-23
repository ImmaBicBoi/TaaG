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
/******************************************************/
/***** INSERT DUMMY DATA INTO  POSITION TABLE *********/
/******************************************************/

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

drop procedure if exists CREATE_POSITION;
delimiter $$
create procedure CREATE_POSITION (in PosName varchar(30), in ParentPos int(10),
								  in PerId int(10), in JobId varchar(20))
							
begin
		start transaction;
		insert into POSITION (POSITION_NAME, PARENT_POS_ID, PERSON_ID, JOB_ID) values (PosName, ParentPos, PerId, JobId);
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists UPDATE_POSITION;

delimiter $$
create procedure UPDATE_POSITION (in PosId int(10), in PosName varchar(30), 
								  in ParentPos int(10), in PerId int(10), in JobId varchar(20))
begin
		start transaction;
		Update POSITION 
		SET 
		POSITION_NAME = PosName,
		PARENT_POS_ID = ParentPos,
		PERSON_ID = PerId,
		JOB_ID = JobId
		WHERE 
		POSITION_ID = PosId;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists DELETE_POSITION;
delimiter $$
create procedure DELETE_POSITION (in PosId int(10))
begin
		start transaction;
		DELETE from POSITION where POSITION_ID = PosId;
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_ALL_POSITIONS;
delimiter $$
create procedure RETRIEVE_ALL_POSITIONS ()
begin
		start transaction;
	select POSITION_ID, POSITION_NAME, PARENT_POS_ID, PERSON_ID, JOB_ID from  POSITION; 
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_POSITION;
delimiter $$
create procedure RETRIEVE_POSITION (in PosId int(10))
begin
		start transaction;
		select POSITION_ID,POSITION_NAME,PARENT_POS_ID,PERSON_ID, JOB_ID from  POSITION 
		where POSITION_ID = PosId;
		
				
    commit;
    
end$$
delimiter ;

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

/******************************************************/
/***** INSERT DUMMY DATA INTO  PERSON TABLE ***********/
/******************************************************/

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

drop procedure if exists CREATE_PERSON;
delimiter $$
create procedure CREATE_PERSON (in Person_firstName varchar(255), in Person_lastName varchar(255),
								  in empid varchar(20))
							
begin
		start transaction;
		insert into PERSON (PERSON_FNAME, PERSON_LNAME, EMPLOYEE_ID) values (Person_firstName,Person_lastName, empid);
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists UPDATE_PERSON;

delimiter $$
create procedure UPDATE_PERSON (in PerId int(10), in Person_firstName varchar(255), 
								in Person_lastName varchar(255),  in empid varchar(20))
begin
		start transaction;
		Update PERSON 
		SET 
		PERSON_FNAME = Person_firstName,
		PERSON_LNAME = Person_lastName,
		EMPLOYEE_ID = empid
		WHERE 
		PERSON_ID = PerId;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists DELETE_PERSON;
delimiter $$
create procedure DELETE_PERSON (in PerId int(10))
begin
		start transaction;
		DELETE from PERSON where PERSON_ID = PerId;
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_ALL_PEOPLE;
delimiter $$
create procedure RETRIEVE_ALL_PEOPLE ()
begin
		start transaction;
	select PERSON_ID, PERSON_FNAME, PERSON_LNAME, EMPLOYEE_ID from  PERSON; 
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_PERSON;
delimiter $$
create procedure RETRIEVE_PERSON (in PerId int(10))
begin
		start transaction;
		select PERSON_ID, PERSON_FNAME, PERSON_LNAME, EMPLOYEE_ID from  PERSON 
		where PERSON_ID = PerId;
		
				
    commit;
    
end$$
delimiter ;

