use orgchartdb;


/******************************************************/
/***********       POSITION             ***************/
/******************************************************/

drop table if exists POSITION;

create table POSITION (
	POSITION_ID int NOT NULL AUTO_INCREMENT,
	POSITION_NAME varchar(30) NOT NULL UNIQUE,
	PARENT_POS_ID int(10),
	PERSON_ID int(10),
	
	PRIMARY KEY (POSITION_ID),
    KEY FK_PERSON (PERSON_ID)
	
);
/******************************************************/

drop procedure if exists CREATE_POSITION;
delimiter $$
create procedure CREATE_POSITION (in PosName varchar(30), in ParentPos int(10),
								  in PerId int(10))
							
begin
		start transaction;
		insert into POSITION (POSITION_NAME,PARENT_POS_ID, PERSON_ID) values (PosName,ParentPos, PerId);
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists UPDATE_POSITION;

delimiter $$
create procedure UPDATE_POSITION (in PosId int(10), in PosName varchar(30), 
								  in ParentPos int(10), in PerId int(10))
begin
		start transaction;
		Update POSITION 
		SET 
		POSITION_NAME = PosName,
		PARENT_POS_ID = ParentPos,
		PERSON_ID = PerId
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
	select POSITION_ID,POSITION_NAME,PARENT_POS_ID,PERSON_ID from  POSITION; 
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_POSITION;
delimiter $$
create procedure RETRIEVE_POSITION (in PosId int(10))
begin
		start transaction;
		select POSITION_ID,POSITION_NAME,PARENT_POS_ID,PERSON_ID from  POSITION 
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
	EMAIL varchar(255) NOT NULL UNIQUE,
	
	PRIMARY KEY (PERSON_ID)
);
/******************************************************/

drop procedure if exists CREATE_PERSON;
delimiter $$
create procedure CREATE_PERSON (in Person_firstName varchar(255), in Person_lastName varchar(255),
								  in email varchar(255))
							
begin
		start transaction;
		insert into PERSON (PERSON_FNAME,PERSON_LNAME,EMAIL ) values (Person_firstName,Person_lastName, email);
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists UPDATE_PERSON;

delimiter $$
create procedure UPDATE_PERSON (in PerId int(10), in Person_firstName varchar(255), 
								in Person_lastName varchar(255),  in email varchar(255))
begin
		start transaction;
		Update POSITION 
		SET 
		PERSON_FNAME = Person_firstName,
		PERSON_LNAME = Person_lastName,
		EMAIL = email
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
	select PERSON_ID, PERSON_FNAME, PERSON_LNAME, EMAIL from  PERSON; 
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_PERSON;
delimiter $$
create procedure RETRIEVE_PERSON (in PosId int(10))
begin
		start transaction;
		select PERSON_ID, PERSON_FNAME, PERSON_LNAME, EMAIL from  PERSON 
		where PERSON_ID = PerId;
		
				
    commit;
    
end$$
delimiter ;

