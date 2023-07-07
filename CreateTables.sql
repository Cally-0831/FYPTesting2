

DROP TABLE IF EXISTS allusers;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS supervisor;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS classroom;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS student_take_course;
DROP TABLE IF EXISTS allrequestfromstudent;
DROP TABLE IF EXISTS supervisorpairstudent;
Drop table if exists allrequestfromsupervisor;
Drop table if exists allclassroomtimeslot;
DROP trigger IF exists testref;
Drop trigger if exists checkstudenttakecourse;

create table  allusers(
allusersname	varchar(100) Not null,
pid			varchar(20) not null,
password	varchar(20) not null,
states		varchar(20),
errortime	int,
role	varchar(20),

PRIMARY key (pid));

create table   student(
stdname		varchar(100) Not null,
sid			varchar(20) not null,
password	varchar(20) not null,
states		varchar(20),
errortime	int,
PRIMARY key (sid));

create table supervisor(
supname		varchar(100) Not null,
tid			varchar(20) not null,
password	varchar(20) not null,
states		varchar(20),
errortime	int,
PRIMARY key (tid));

create table class(
CCode		varchar(10) Not null,
CSecCode	varchar(10) not null,
CID			varchar(20) not null,
RID			varchar(10) not null,
weekday 	varchar(10) not null,
startTime	time,
endTime		time,
Check (endTime>startTime),
PRIMARY key (CID));

create table classroom(
Campus varchar(10) not null,
RID		varchar(10) Not null,
status varchar(10) not null,
PRIMARY key (Campus,RID));

create table logs(logstring varchar(8000));

create table Student_take_Course(
CID		varchar(20) not null,
SID		varchar(10) not null,
CONSTRAINT csid
primary key (CID,SID)
);

create table allrequestfromsupervisor(
ReqID	varchar(20) not null,
TID		varchar(10) not null,
RequestDate DATE not null,
RequestStartTime time not null,
RequestEndTime time not null,
primary key (ReqID)
);
create table allrequestfromstudent(
ReqID	varchar(20) not null,
SID		varchar(10) not null,
RequestDate DATE not null,
RequestStartTime time not null,
RequestEndTime time not null,
reason	varchar(1000) not null,
proofpath varchar(100) not null,
status varchar(10) not null,
reply varchar(100),
primary key (ReqID)
);
create table supervisorpairstudent(
TID		varchar(20) not null,
SID		varchar(10) not null,
Topic 	varchar(50) not null,
primary key (TID,SID)
);

create table allclassroomtimeslot(
ReqID	varchar(20) not null,
Campus varchar(10) not null,
RID		varchar(10) Not null,
StartDate DATE not null,
EndDate DATE not null,
StartTime time not null,
EndTime time not null,
Remarks varchar(100),
primary key (ReqID)
);

delimiter |

CREATE TRIGGER testref BEFORE INSERT ON class
  FOR EACH ROW
  BEGIN
  declare stringstring  varchar(8000);
  declare countcount integer;
  set stringstring = new.cid;
  set countcount =0;
  select count(*) into countcount from class 
  where rid = new.rid and weekday = new.weekday and (starttime <= new.starttime and endtime >= new.starttime);
  if countcount >0 then
    set new.rid ="empty";
    END IF;
  END;
  |
delimiter ;

##delimiter |
##CREATE TRIGGER checkstudenttakecourse BEFORE INSERT ON student_take_course
##  FOR EACH ROW
##  BEGIN
##  declare stringstring  varchar(8000);
##  declare countcount integer;
##  set stringstring = new.cid;allusersallusers
##  set countcount =0;
##  select count(*) into countcount from student_take_course 
##  where cid = new.cid and sid = new.sid;
##  if countcount >0 then
##    insert into logs values("duplicated");
##    END IF;
##  END;
##  |
##delimiter ;

delimiter |
CREATE TRIGGER addalluserstoroletable BEFORE INSERT ON allusers
  FOR EACH ROW
  BEGIN
##  declare stringstring  varchar(8000);
##  declare countcount integer;
##  set stringstring = new.cid;allusersallusers

##  set countcount =0;
##  select count(*) into countcount from student_take_course 
##  where cid = new.cid and sid = new.sid;
  if new.role = "stu" then
    insert into student values(new.allusersname,new.pid,new.password,new.states,new.errortime);
	elseif new.role = "sup" then
    insert into supervisor values(new.allusersname,new.pid,new.password,new.states,new.errortime);
    END IF;
  END;
  |
delimiter ;

