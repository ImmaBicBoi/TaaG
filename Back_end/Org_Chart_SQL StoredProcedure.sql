use orgchartdb;

drop table if exists POSITION;

create table POSITION (
	POSITION_ID int NOT NULL AUTO_INCREMENT,
	POSITION_NAME varchar(30) NOT NULL UNIQUE,
	POSITION_WEIGHT int(10),
	PARENT_POS_ID int(10),
	
	PRIMARY KEY (POSITION_ID)
);
/******************************************************/

drop procedure if exists CREATE_POSITION;
delimiter $$
create procedure CREATE_POSITION (in PosName varchar(30), 
								  in PosWt int(10), in ParentPos int(10))
							
begin
		start transaction;
		insert into POSITION (POSITION_NAME,POSITION_WEIGHT,PARENT_POS_ID) values (PosName,PosWt,ParentPos );
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists UPDATE_POSITION;

delimiter $$
create procedure UPDATE_POSITION (in PosID int(10), in PosName varchar(30), 
								  in PosWt int(10), in ParentPos int(10))
begin
		start transaction;
		Update POSITION 
		SET 
		POSITION_NAME = PosName,
		POSITION_WEIGHT = PosWt,
		PARENT_POS_ID = ParentPos
		WHERE 
		POSITION_ID = PosID;
				
    commit;
    
end$$
delimiter ;

/******************************************************/
drop procedure if exists DELETE_POSITION;
delimiter $$
create procedure DELETE_POSITION (in PosId int(10))
begin
		start transaction;
		DELETE from POSITION where POSITION_ID = PosID;
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_ALL_POSITIONS;
delimiter $$
create procedure RETRIEVE_ALL_POSITIONS ()
begin
		start transaction;
	select POSITION_ID,POSITION_NAME,POSITION_WEIGHT,PARENT_POS_ID from  POSITION; 
				
    commit;
    
end$$
delimiter ;
/******************************************************/
drop procedure if exists RETRIEVE_POSITION;
delimiter $$
create procedure RETRIEVE_POSITION (in PosId int(10))
begin
		start transaction;
		select POSITION_ID,POSITION_NAME,POSITION_WEIGHT,PARENT_POS_ID from  POSITION 
		where POSITION_ID = PosID;
		
				
    commit;
    
end$$
delimiter ;
/**
EXAMPLES TO EXECUTE STORED PROCEDURE
**/
CALL RETRIEVE_all_POSITIONS;
CALL CREATE_POSITION('se',43,2);
CALL CREATE_POSITION('DEV',43,2);
CALL CREATE_POSITION('se1',43,2);
CALL CREATE_POSITION('se2',43,2);
call retrieve_one_position(6);
call delete_position(1);
CALL UPDATE_POSITION(5, 'se5', 43, 4);

