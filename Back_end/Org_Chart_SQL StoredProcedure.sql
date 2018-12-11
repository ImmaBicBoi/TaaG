use orgchartdb;


/******************************************************/
/***********       POSITION             ***************/
/******************************************************/

drop table if exists POSITION;

create table POSITION (
	POSITION_ID int NOT NULL AUTO_INCREMENT,
	POSITION_NAME varchar(30) NOT NULL,
	PARENT_POS_ID int(10),
	PERSON_ID int(10) UNIQUE,
	JOB_ID varchar(20) UNIQUE NOT NULL,
	
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

/* INSERT POSITION */

drop procedure if exists CREATE_POSITION;
delimiter $$
create procedure CREATE_POSITION (in PosName varchar(30), in ParentPos int(10),
								  in PerId int(10), in JobId varchar(20), out PosId int(10))
							
begin
		start transaction;
		insert into POSITION (POSITION_NAME, PARENT_POS_ID, PERSON_ID, JOB_ID) values (PosName, ParentPos, PerId, JobId);
		SET PosId = LAST_INSERT_ID();
		Select PosId;
    commit;
		
   
end$$
delimiter ;

/******************************************************/
/* UPDATE POSITION */

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
/* DELETE POSITION */

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
/* RETRIEVE ALL POSITIONS */

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
/* RETRIEVE POSITION BY ID */

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
('Years of experience','8 years',1),
('Programming Language skill','Java',1),

('Type','Part Time',2),
('Base Pay','$ 50,000',2),
('Years of experience','9 years',2),
('Programming Language skill','C#',2),


('Type','Full Time',3),
('Base Pay','$ 250,000',3),
('Years of experience','8 years',3),
('Programming Language skill','Java',3),

('Type','Part Time',4),
('Base Pay','$ 350,000',4),
('Years of experience','10 years',4),
('Programming Language skill','Java',4),

('Type','Full Time',5),
('Base Pay','$ 250,000',5),
('Years of experience','8 years',5),
('Programming Language skill','Java',5),

('Type','',6),
('Base Pay','',6),
('Years of experience','',6),
('Programming Language skill','',6),

('Type','',7),
('Base Pay','',7),
('Years of experience','',7),
('Programming Language skill','',7),

('Type','',8),
('Base Pay','',8),
('Years of experience','',8),
('Programming Language skill','',8),

('Type','',9),
('Base Pay','',9),
('Years of experience','',9),
('Programming Language skill','',9),

('Type','',10),
('Base Pay','',10),
('Years of experience','',10),
('Programming Language skill','',10);



/******************************************************/
/* INSERT POSITION ATTRIBUTES */

drop procedure if exists CREATE_POSITION_ATTR;
delimiter $$
create procedure CREATE_POSITION_ATTR ( in attr_key varchar(255), in attr_value varchar(255),in PosId int (10))
							
begin
		start transaction;
		insert into POSITION_ATTRIBUTE (POS_ATTR_KEY, POS_ATTR_VALUE, POSITION_ID) values (attr_key, attr_value, PosId);
				
    commit;
    
end$$
delimiter ;

/******************************************************/
/* DELETE POSITION ATTRIBUTES*/

drop procedure if exists DELETE_POSITION_ATTR;
delimiter $$
create procedure DELETE_POSITION_ATTR (in PosId int(10))
begin
		start transaction;
		DELETE from POSITION_ATTRIBUTE where POSITION_ID = PosId;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
/* RETRIEVE POSITION ATTRIBUTES BY POSITION_ID */

drop procedure if exists RETRIEVE_POSITION_ATTR;
delimiter $$
create procedure RETRIEVE_POSITION_ATTR (in PosId int(10))
begin
		start transaction;
		select POS_ATTR_KEY,POS_ATTR_VALUE from  POSITION_ATTRIBUTE
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
	EMPLOYEE_ID varchar(20) UNIQUE NOT NULL,
	
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
/* INSERT PERSON */

drop procedure if exists CREATE_PERSON;
delimiter $$
create procedure CREATE_PERSON (in Person_firstName varchar(255), in Person_lastName varchar(255),
								  in empid varchar(255), out perId int(10))
							
begin
		start transaction;
		insert into PERSON (PERSON_FNAME, PERSON_LNAME, EMPLOYEE_ID) values (Person_firstName,Person_lastName, empid);
		SET PerId = LAST_INSERT_ID();
		Select PerId;
    commit;
    
end$$
delimiter ;

/******************************************************/
/* UPDATE PERSON */

drop procedure if exists UPDATE_PERSON;

delimiter $$
create procedure UPDATE_PERSON (in PerId int(10), in Person_firstName varchar(255), 
								in Person_lastName varchar(255),  in empid varchar(255))
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
/* DELETE PERSON */

drop procedure if exists DELETE_PERSON;
delimiter $$
create procedure DELETE_PERSON (in PerId int(10))
begin
		start transaction;
		DELETE from PERSON where PERSON_ID = PerId;
		
		UPDATE POSITION
        SET
        PERSON_ID = NULL
        WHERE 
        PERSON_ID = PerId;
				
    commit;
    
end$$
delimiter ;
/******************************************************/
/* RETIEVE ALL PEOPLE */

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
/* RETRIEVE PERSON BY ID */

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
('Address','Main Ave, Stamford', 1),
('Mobile Number','728-584-7730', 1),
('DOB','06-09-1987', 1),

('Email','sarah.mitchell@gmail.com',2),
('Office','Fairfield, CT',2),
('Address','Main Ave, Stamford', 2),
('Mobile Number','728-500-7700', 2),
('DOB','07-08-1987', 6),

('Email','rachel.green@gmail.com', 3),
('Office','Fairfield, CT',3),
('Address','Main Ave, Stamford', 3),
('Mobile Number','728-584-7730', 3),
('DOB','06-09-1987', 3),


('Email','peter.clark@gmail.com', 4),
('Office','Fairfield, CT',4),
('Address','Main Ave, Stamford', 4),
('Mobile Number','728-584-7730', 4),
('DOB','06-09-1987', 4),

('Email','jason.murray@gmail.com', 5),
('Office','Fairfield, CT',5),
('Address','Belden Ave, Fairfield',5),
('Mobile Number','728-584-7730', 5),
('DOB','3-02-1990', 5),

('Email','',6),
('Office','',6),
('Address','', 6),
('Mobile Number','', 6),
('DOB','', 6),

('Email','',8),
('Office','',8),
('Address','', 8),
('Mobile Number','', 8),
('DOB','', 8),

('Email','', 7),
('Office','',7),
('Address','', 7),
('Mobile Number','', 7),
('DOB','', 7),


('Email','', 9),
('Office','',9),
('Address','', 9),
('Mobile Number','', 9),
('DOB','', 9),

('Email','', 10),
('Office','',10),
('Address','',10),
('Mobile Number','', 10),
('DOB','', 10);



/******************************************************/
/* INSERT PERSON ATTRIBUTES*/

drop procedure if exists CREATE_PERSON_ATTR;
delimiter $$
create procedure CREATE_PERSON_ATTR ( in attr_key varchar(255), in attr_value varchar(255),in PerId int (10))
							
begin
		start transaction;
		insert into PERSON_ATTRIBUTE (PER_ATTR_KEY, PER_ATTR_VALUE, PERSON_ID) values (attr_key, attr_value, PerId);
				
    commit;
    
end$$
delimiter ;
/******************************************************/

/* DELETE PERSON ATTRIBUTES*/

drop procedure if exists DELETE_PERSON_ATTR;
delimiter $$
create procedure DELETE_PERSON_ATTR (in PerId int(10))
begin
		start transaction;
		DELETE from PERSON_ATTRIBUTE where PERSON_ID = PerId;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
/* RETRIEVE PERSON ATTRIBUTES BY PERSON_ID */

drop procedure if exists RETRIEVE_PERSON_ATTR;
delimiter $$
create procedure RETRIEVE_PERSON_ATTR (in PerId int(10))
begin
		start transaction;
		select PER_ATTR_KEY, PER_ATTR_VALUE from  PERSON_ATTRIBUTE 
		where PERSON_ID = PerId;
		
    commit;
    
end$$
delimiter ;

/******************************************************/
/***********       ORG_CHART             ***************/
/******************************************************/

drop table if exists ORG_CHART;

create table ORG_CHART (
	CHART_ID int NOT NULL AUTO_INCREMENT,
	CHART_NAME varchar(30) NOT NULL,
	CHART_DATA LONGTEXT NOT NULL,
	
	PRIMARY KEY (CHART_ID)
);

/******************************************************/

/* INSERT CHART */

drop procedure if exists CREATE_CHART;
delimiter $$
create procedure CREATE_CHART(in ChartName varchar(30), in ChartData LONGTEXT)			  
							
begin
		start transaction;
		insert into ORG_CHART (CHART_NAME, CHART_DATA) values (ChartName, ChartData);
    commit;
		
   
end$$
delimiter ;

/******************************************************/
/* UPDATE CHART */

drop procedure if exists UPDATE_CHART;

delimiter $$
create procedure UPDATE_CHART (in ChartName varchar(30),  in ChartData LONGTEXT)
begin
        declare chartId INT;
		start transaction;
        select CHART_ID into chartId from ORG_CHART ;
		Select chartId;
		
		Update ORG_CHART 
		SET 
		 CHART_NAME = ChartName ,
		 CHART_DATA = ChartData
		
		WHERE 
		CHART_ID = ChartId;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
/* DELETE CHART */

drop procedure if exists DELETE_CHART;
delimiter $$
create procedure DELETE_CHART (in ChartId int(10))
begin
		start transaction;
		DELETE from ORG_CHART where CHART_ID = ChartId;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
/*RETRIEVE LATEST CHART*/

drop procedure if exists RETRIEVE_LATEST_CHART;
delimiter $$
create procedure RETRIEVE_LATEST_CHART ()
begin
		start transaction;
		select CHART_ID,CHART_NAME,CHART_DATA from  ORG_CHART;
						
    commit;
    
end$$
delimiter ;

/******************************************************/
/*CREATE ATTRIBUTE TABLE*/
drop table if exists ATTRIBUTE;

create table ATTRIBUTE (
	ATTR_ID int NOT NULL AUTO_INCREMENT,
	ATTR_KEY varchar(30) NOT NULL,
	ATTR_ORDER int (10) NOT NULL,
	IS_VISIBLE BOOLEAN NOT NULL,
	ATTR_TYPE varchar(10) NOT NULL,
	
	PRIMARY KEY (ATTR_ID)
);

/* INSERT DUMMY DATA INTO ATTRIBUTE TABLE */

insert into ATTRIBUTE (ATTR_KEY,ATTR_ORDER,IS_VISIBLE,ATTR_TYPE) values 
('Email',1,1,'Person'),
('Office',2,1,'Person'),
('Address',3,0,'Person'),
('Mobile Number',4,0,'Person'),
('DOB',5,0,'Person'),
('Type',1,1,'Position'),
('Base Pay',2,1,'Position'),
('Years of Experience',3,0,'Position'),
('Programming Language skill',4,0,'Position');

/******************************************************/
/*INSERT INTO ATTRIBUTE TABLE*/

drop procedure if exists INSERT_ATTRIBUTE;
delimiter $$
create procedure INSERT_ATTRIBUTE(in att_key varchar(30), in Att_odr int (10), 
								  in is_vis BOOLEAN , in att_typ varchar(10))			  
							
begin
		start transaction;
		insert into ATTRIBUTE (ATTR_KEY, ATTR_ORDER, IS_VISIBLE, ATTR_TYPE) values (att_key, Att_odr, is_vis, att_typ);
    commit;
		
   
end$$
delimiter ;

/******************************************************/
/*UPDATE ATTRIBUTE TABLE*/

drop procedure if exists UPDATE_ATTRIBUTE;

delimiter $$
create procedure UPDATE_ATTRIBUTE (in id int(10), in att_key varchar(30), in Att_odr int (10), 
								  in is_vis BOOLEAN)
begin
		start transaction;
				
		Update ATTRIBUTE 
		SET 
		 ATTR_KEY = att_key,
		 ATTR_ORDER = Att_odr ,
		 IS_VISIBLE = is_vis
		
		WHERE 
		ATTR_ID = id;
				
    commit;
    
end$$
delimiter ;
/******************************************************/
/******************************************************/
/*RETRIEVE POSITION ATTRIBUTE*/

drop procedure if exists RETRIEVE_ATTRIBUTE_TYPE_POSITION;
delimiter $$
create procedure RETRIEVE_ATTRIBUTE_TYPE_POSITION ()
begin
		start transaction;
		select ATTR_ID,ATTR_KEY,ATTR_ORDER,IS_VISIBLE from attribute where attr_type = 'Position';
	
    commit;
    
end$$
delimiter ;

/******************************************************/
/*RETRIEVE PERSON ATTRIBUTE*/

drop procedure if exists RETRIEVE_ATTRIBUTE_TYPE_PEOPLE;
delimiter $$
create procedure RETRIEVE_ATTRIBUTE_TYPE_PEOPLE ()
begin
		start transaction;
		select ATTR_ID,ATTR_KEY,ATTR_ORDER,IS_VISIBLE from attribute where attr_type = 'Person';
		
    commit;
    
end$$
delimiter ;

/******************************************************/
/*RETRIEVE ALL PEOPLE WITH ATTRIBUTES*/
drop procedure if exists RETRIEVE_ALL_PEOPLE_WITH_ATTR;
delimiter $$
create procedure RETRIEVE_ALL_PEOPLE_WITH_ATTR (in perId int(10))
begin
		start transaction;
		select pa.PER_ATTR_KEY, pa.PER_ATTR_VALUE, a.ATTR_ORDER from PERSON_ATTRIBUTE pa, ATTRIBUTE a
		where pa.PER_ATTR_KEY = a.ATTR_KEY
		and pa.PERSON_ID = perId
		and a.IS_VISIBLE = true
		and a.ATTR_TYPE = "Person"
		ORDER BY a.ATTR_ORDER;	
	
    commit;
    
end$$
delimiter ;

/******************************************************/
/*RETRIEVE ALL POSITIONS WITH ATTRIBUTE*/
drop procedure if exists RETRIEVE_ALL_POSITIONS_WITH_ATTR;
delimiter $$
create procedure RETRIEVE_ALL_POSITIONS_WITH_ATTR (in posId int(10))
begin
		start transaction;
		select pa.POS_ATTR_KEY, pa.POS_ATTR_VALUE, a.ATTR_ORDER from POSITION_ATTRIBUTE pa, ATTRIBUTE a
		where pa.POS_ATTR_KEY = a.ATTR_KEY
		and pa.POSITION_ID = posId
		and a.IS_VISIBLE = true
		and a.ATTR_TYPE = "Position"
		ORDER BY a.ATTR_ORDER;	
	
    commit;
    
end$$
delimiter ;
