
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

#Sample User
insert into allusers values("Apple","sid11111","spw11111","active","0","stu");
insert into allusers values("Betty","sid22222","spw22222","active","0","stu");

INSERT INTO  allusers VALUES ("Prof Chan","tid00001","tpw00001","Active",0,"sup");
INSERT INTO  allusers VALUES ("Prof Lam","tid00002","tpw00002","Active",0,"sup");
INSERT INTO  allusers VALUES ("Admin","admin","P@ssw0rd","Active",0,"adm");



#sample data
INSERT INTO  student_take_course VALUES("s01","c01");
insert into allrequestfromsupervisor values("askhjdfoasdjfi","tid00001","2023-04-03","00:00", "14:00");

insert into student_take_course values("COMP100500001","111");
insert into classroom 	values("Campus A","RM101","Open");
insert into classroom 	values("Campus B","RM102","Open");
insert into allclassroomtimeslot values("Campus_B_RM102_0sdf1","Campus B","RM102","2023-04-03","2023-04-03","00:00","23:59","remarks");


insert into class values("COMP1005","00001","COMP100500001","RM101","MON","08:30","09:20");
insert into class values("COMP1005","10001","COMP100510001","RM101","MON","08:30","09:20");
insert into class values("COMP1005","10002","COMP100510002","RM101","TUE","09:00","09:20");
insert into class values("COMP1005","10003","COMP100510003","RM101","MON","09:30","10:20");