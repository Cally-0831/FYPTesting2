
DROP TABLE IF EXISTS allusers;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS supervisor;
DROP TABLE IF EXISTS observer;
DROP TABLE IF EXISTS allclass;
DROP TABLE IF EXISTS classroom;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS alltakecourse;
DROP TABLE IF EXISTS allobstakecourse;
DROP TABLE IF EXISTS allsupertakecourse;
DROP TABLE IF EXISTS allstudenttakecourse;
DROP TABLE IF EXISTS allrequestfromstudent;
DROP TABLE IF EXISTS allrequestfromobserver;
DROP TABLE IF EXISTS supervisorpairstudent;
DROP TABLE IF EXISTS supervisorpairobserver;
DROP TABLE IF EXISTS observerpairstudent;
Drop table if exists allrequestfromsupervisor;
Drop table if exists allclassroomtimeslot;
Drop table if exists allnotice;
Drop table if exists temptakecourse;
Drop table if exists allsupersetting;
Drop table if exists allschedulebox;


DROP trigger IF exists testref;
Drop trigger if exists checkstudenttakecourse;
Drop trigger if exists insertcretorname;
Drop trigger if exists addlessontimeforoneCode;
Drop trigger if exists takeallcourseofonecode;
Drop trigger if exists delallsupertakecourse;
Drop trigger if exists delallobstakecourse;
Drop trigger if exists inputallcourseofonecode;
Drop trigger if exists delallstudenttakecourse;
Drop trigger if exists addtopicinsupervisor;
Drop trigger if exists addsubinstudent;
Drop trigger if exists addsubinsuper;
Drop trigger if exists addsubinobs;
Drop trigger if exists copypicdata_and_commentstonewentry_student;
Drop trigger if exists concatcomments_student;
Drop trigger if exists clearnoticeforthesetting;
Drop trigger if exists cancellessonwhendeletelesson;
