
module.exports = {


    liststudent: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var allstulist;
        var allsuplist;



        if (req.session.role == "sup") {

            var getsupstdlist = "select student.sid, student.stdname,supervisorpairstudent.Topic,observerpairstudent.OID,observerpairstudent.obsname,student.ttbsubmission from supervisor join  supervisorpairstudent on supervisor.tid = supervisorpairstudent.tid join student on student.sid = supervisorpairstudent.sid left join observerpairstudent on observerpairstudent.sid = student.sid where supervisor.tid = \"" + req.session.userid + "\"";

            db.query(getsupstdlist, (err, results) => {
                try {
                    var string = JSON.stringify(results);
                    var json = JSON.parse(string);
                    var stdlist = json;
                    console.log('>> stdlist: ', stdlist); 
                    if(stdlist.length ==0){stdlist = null;}
                    var getsupbeobslist = "select student.stdname, observerpairstudent.sid,supervisor.tid,supervisor.supname,supervisorpairstudent.Topic from observerpairstudent left join student on student.sid = observerpairstudent.sid left join supervisorpairstudent on supervisorpairstudent.sid = student.sid left join supervisor on supervisor.tid = supervisorpairstudent.tid where oid = \"" + req.session.userid + "\"";
                    db.query(getsupbeobslist, (err, results) => {
                        try {
                            var string = JSON.stringify(results);
                            var json = JSON.parse(string);
                            var observinglist = null;
                            if (json.length > 0) {
                                observinglist = json;
                            }

                            var checkdeadline = "select deadlinedate , deadlinetime from allsupersetting where typeofsetting = \"5\" and Announcetime is not null";
                            db.query(checkdeadline, (err, results) => {
                                try {
                                    var string = JSON.stringify(results);
                                    var json = JSON.parse(string);

                                    if (json.length > 0) {
                                        deadlinedate = new Date(json[0].deadlinedate);
                                        deadlinetime = json[0].deadlinetime.split(":");
                                        deadlinedate.setHours(deadlinetime[0]);
                                        deadlinedate.setMinutes(deadlinetime[1]);
                                        deadlinedate.setSeconds(deadlinetime[2]);
                                        finaldate = deadlinedate;
                                    } else {
                                        finaldate = undefined
                                    }
                                    console.log("controller    " + finaldate)
                                    
                                    return res.view('user/listuser', { checkdate: finaldate, allstdlist: stdlist, allsuplist: null, observinglist: observinglist });
                       
                                    return res.status(200).json(JSON.parse(JSON.stringify({checkdate: finaldate, allstdlist: stdlist, allsuplist: null, observinglist: observinglist})))
                                    //return res.view('user/listuser', { checkdate: finaldate, allstdlist: stdlist, allsuplist: null, observinglist: observinglist });
                                } catch (err) {
                                    return res.status(400).json("Error happened in StudentListController.liststudent.checkdeadline");
                                }
                            })
                        } catch (err) {
                            return res.status(400).json("Error happened in StudentListController.liststudent.getsupbeobslist");
                        }
                    })
                } catch (err) {
                    return res.status(400).json("Error happened in StudentListController.liststudent.getsupstdlist");
                }
            });
        } else {
            thisistheline = "select supervisor.tid,supervisor.supname,student.sid,student.stdname,supervisor.submission from supervisor left join supervisorpairstudent on  supervisorpairstudent.tid = supervisor.tid left join student on supervisorpairstudent.sid = student.sid";
            db.query(thisistheline, (err, results) => {
                try {
                    var string = JSON.stringify(results);
                    var json = JSON.parse(string);
                    suplist = json;
                    var thisistheline = "select * from allsupersetting where typeofsetting = \"5\" and Announcetime is not null"
                    db.query(thisistheline, function (err, result) {
                        try {
                            var string = JSON.stringify(result);
                            var json = JSON.parse(string);
                            var deadlinedate;
                            var deadlinetime;
                            var finaldate;

                            if (json.length > 0) {
                                deadlinedate = new Date(json[0].deadlinedate);
                                deadlinetime = json[0].deadlinetime.split(":");
                                deadlinedate.setHours(deadlinetime[0]);
                                deadlinedate.setMinutes(deadlinetime[1]);
                                deadlinedate.setSeconds(deadlinetime[2]);
                                finaldate = deadlinedate;
                            } else {
                                finaldate = undefined
                            }

                            return res.view('user/listuser', { allsuplist: suplist, checkdate: finaldate, observinglist: null });
                        } catch (err) {
                            return res.status(400).json("Error happened in StudentListController.liststudent.getsupstdlist");
                        }
                    })
                } catch (err) {
                    return res.status(400).json("Error happened in StudentListController.liststudent.getsupstdlist");

                }


            });

        }








    },
    gettopic: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var topiclist = new Array();
        console.log(topiclist)
        console.log(topiclist.length)

        let thisistheline = "SELECT  topics FROM supervisor where tid =\"" + req.session.userid + "\"\;";

        db.query(thisistheline, (err, results) => {
            try {
                var string = JSON.stringify(results);

                var json = JSON.parse(string);
                //   console.log('>> json: ', json);  
                var stringstring = json[0].topics.split("/").sort()
                topiclist = stringstring;


                console.log(">>topiclist final   " + topiclist)
                return res.view('user/createnewstudent', { alltopiclist: topiclist });
            } catch (err) {

                console.log("error happened in StudentListController: gettopic");
            }


        });
    },

    readsingleppl: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var studentresult;
        var type;
        var obslist;
        var requestlist;
        var checkdate;


        if (req.params.id.charAt(0) == "s") {
            type = "stu";
            thisistheline = "select student.sid, student.stdname,supervisorpairstudent.Topic,observerpairstudent.OID,observerpairstudent.obsname from supervisor join  supervisorpairstudent on supervisor.tid = supervisorpairstudent.tid join student on student.sid = supervisorpairstudent.sid left join observerpairstudent on observerpairstudent.sid = student.sid where student.sid = \"" + req.params.id + "\"\;";
            db.query(thisistheline, (err, results) => {
                try {
                    var string = JSON.stringify(results);
                    var json = JSON.parse(string);
                    studentresult = json;
                    console.log('>> stdlist: ', studentresult);
                    thisistheline = "select * from allrequestfromstudent where sid = \"" + req.params.id + "\"\;";

                    db.query(thisistheline, (err, results) => {
                        try {
                            var string = JSON.stringify(results);
                            var json = JSON.parse(string);
                            studentrequestlist = json;
                            console.log('>> studentrequestlist: ', studentrequestlist)
                            thisistheline = "select * from allsupersetting where typeofsetting=\"" + 5 + "\" and Announcetime is not null";
                            db.query(thisistheline, (err, results) => {
                                try {
                                    var string = JSON.stringify(results);
                                    var json = JSON.parse(string);
                                    if (json.length > 0) {
                                        var deadlinedate = new Date(json[0].deadlinedate);
                                        var deadlinetime = json[0].deadlinetime.split(":");
                                        deadlinedate.setHours(deadlinetime[0]);
                                        deadlinedate.setMinutes(deadlinetime[1]);
                                        deadlinedate.setSeconds(deadlinetime[2]);
                                        checkdate = deadlinedate;

                                    }
                                    console.log(checkdate)
                                    return res.view('user/read', { type: type, thatppl: studentresult, obslist: undefined, requestlist: studentrequestlist, checkdate: checkdate });

                                } catch (err) {
                                    console.log("error happened in StudentListController: readsingleppl 1");
                                }
                            })
                        } catch (err) {
                            console.log("error happened in StudentListController: readsingleppl 2");
                        }
                    })




                } catch (err) {
                    console.log("error happened in StudentListController: readsingleppl3");

                }


            });
        } else if (req.params.id.charAt(0) == "t") {
            type = "sup";
            thisistheline = "select supervisor.submission,supervisor.tid, supervisor.supname ,student.stdname , student.sid,observerpairstudent.obsname, observerpairstudent.oid ,supervisorpairstudent.Topic from supervisor left join  supervisorpairstudent on supervisor.tid = supervisorpairstudent.tid left join student on student.sid = supervisorpairstudent.sid left join observerpairstudent on observerpairstudent.sid = student.sid where supervisor.tid = \"" + req.params.id + "\";";
            db.query(thisistheline, (err, results) => {
                try {
                    var string = JSON.stringify(results);
                    //console.log('>> string: ', string );
                    var json = JSON.parse(string);
                    //console.log('>> json: ', json);  
                    supervisorresult = json;
                    //console.log('>> suplist: ',supervisorresult); 
                    thisistheline = "select * from allrequestfromsupervisor where tid  = \"" + req.params.id + "\";";
                    db.query(thisistheline, (err, results) => {
                        try {
                            var string = JSON.stringify(results);
                            //console.log('>> string: ', string );
                            var json = JSON.parse(string);
                            //console.log('>> json: ', json);  
                            supervisorrequestlist = json;
                            thisistheline = "select student.sid, student.stdname,supervisor.supname,supervisor.tid,supervisorpairstudent.Topic from observerpairstudent left join student on student.sid = observerpairstudent.sid left join supervisorpairstudent on supervisorpairstudent.sid = student.sid left join supervisor on supervisor.tid = supervisorpairstudent.tid where observerpairstudent.oid =\"" + req.params.id + "\";";
                            db.query(thisistheline, (err, results) => {
                                try {
                                    var string = JSON.stringify(results);
                                    var json = JSON.parse(string);
                                    obslist = json;
                                    return res.view('user/read', { type: type, thatppl: supervisorresult, obslist: obslist, requestlist: supervisorrequestlist });

                                } catch (err) {
                                    console.log("error happened in StudentListController: readsingleppl");
                                }

                            })
                        } catch (err) {
                            console.log("error happened in StudentListController: readsingleppl");
                        }

                    })




                } catch (err) {
                    console.log("error happened in StudentListController: readsingleppl");

                }


            });
        }





    },


    deletestudent: async function (req, res) {
        var studentresult;
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        //remove single ppl
        console.log(String(req.params.id).charAt(0))
        if (String(req.params.id).charAt(0) == "s") {
            let thisistheline = "DELETE FROM allusers WHERE pid= \"" + req.params.id + "\"\n";
            console.log('delete excution');
            console.log(thisistheline);
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM student WHERE sid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM supervisorpairstudent WHERE sid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });
            thisistheline = "DELETE FROM observerpairstudent WHERE sid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });
            thisistheline = "DELETE FROM allstudenttakecourse WHERE sid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM allrequestfromstudent WHERE sid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

        } else {
            let thisistheline = "DELETE FROM allusers WHERE pid= \"" + req.params.id + "\"\n";
            console.log('delete excution');
            console.log(thisistheline);
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM observer WHERE oid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });


            thisistheline = "DELETE FROM supervisor WHERE tid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM supervisorpairstudent WHERE tid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM observerpairstudent WHERE oid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });

            thisistheline = "DELETE FROM allrequestfromsupervisor WHERE tid= \"" + req.params.id + "\"\n";
            db.query(thisistheline, (err, results) => {
                if (err) { console.log("error happened in StudentListController: deletestudent"); }
            });
        }




        return res.ok("Deleted");
    },

    createnewstudent: async function (req, res) {
        var stdlist;
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        let pw = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            pw += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }


        //console.log(pw);
        thisistheline = "insert IGNORE into allusers values(\"" +
            req.body.studentname + "\"\,\""
            + req.body.sid + "\"\,\"" +
            pw + "\"\,\"ACTIVE\"\,\"0\"\,\"stu\"\)\;\n";
        //  console.log(thisistheline);
        db.query(thisistheline, function (err, result) {
            if (err) {
                console.log("error happened at StudentListContorller: createnewstudent");
                res.status(401).json("Error happened when excuting : " + thisistheline);
            };
            console.log("1 record inserted");
        });



        if (req.body.topic != "") {

            thisistheline = "insert IGNORE into supervisorpairstudent values(\"" +
                req.session.userid + "\"\,\""
                + req.body.sid + "\"\,\"" +
                req.body.topic + "\"\);";

        } else {
            thisistheline = "insert IGNORE into supervisorpairstudent values(\"" +
                req.session.userid + "\"\,\""
                + req.body.sid + "\"\,\"" +
                req.body.othertext + "\"\);";
        }


        db.query(thisistheline, function (err, result) {
            if (err) {
                res.status(401).json("Error happened when excuting : " + thisistheline);
            };
            console.log("1 record inserted");
        });

        return res.ok("created");
    },
    createnewsup: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var stdlist;
        console.log(req.body);
        let pw = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            pw += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }


        //console.log(pw);
        insertline = "insert IGNORE into allusers values(\"" +
            req.body.supervisorname + "\"\,\""
            + req.body.tid + "\"\,\"" +
            pw + "\"\,\"ACTIVE\"\,\"0\"\,\"sup\"\)\;\n";
        //  console.log(thisistheline);
        db.query(insertline, function (err, result) {
            try {
                console.log("1 record inserted");
                return res.ok("created");
            } catch (err) {
                return res.status(401).json("Error exists when excuting StudentlistController.createnewsup.insertline");
            }


        });




    },

    addpairing: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var checktype = req.params.id.split('&');
        thisistheline = "insert IGNORE into observerpairstudent values(\"" +
            checktype[1] + "\"\,\""
            + checktype[0] + "\"\);";

        db.query(thisistheline, function (err, result) {
            if (err) {
                console.log("error happened at StudentListContorller: addpair");
                res.status(401).json("Error happened when excuting : " + thisistheline);
            };
            console.log("1 record inserted");
            return res.ok();
        });


    },

    uploadstudentlist: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        console.log(req.body);


        for (var i = 0; i < req.body.length; i++) {
            console.log(req.body[i].sid);

            createstudentline = "insert IGNORE into allusers values(\"" +
                req.body[i].studentname + "\"\,\""
                + req.body[i].sid + "\"\,\"" +
                req.body[i].password + "\"\,\"ACTIVE\"\,\"0\"\,\"stu\"\)\;\n";
            console.log(createstudentline);
            var db = await sails.helpers.database();
            db.query(createstudentline, function (err, result) {
                if (err) {
                    console.log("error happened at StudentListContorller: uploadstudentlist");
                    res.status(401).json("Error happened when excuting : " + createstudentline);
                };
            });

        }


        for (var i = 0; i < req.body.length; i++) {
            console.log(req.body[i].sid);
            pairingline = "insert IGNORE into supervisorpairstudent values(\"" +
                req.session.userid + "\"\,\""
                + req.body[i].sid + "\"\,\"" +
                req.body[i].topic + "\"\);";
            console.log(pairingline);
            var db = await sails.helpers.database();
            db.query(pairingline, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(401).json("Error happened when excuting : " + pairingline);

                };

            });

        }






        return res.json();

    },

    uploadsupervisorlist: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();


        for (var i = 0; i < req.body.length; i++) {
            console.log(req.body)

            insertline = "insert IGNORE into allusers values(\"" +
                req.body[i].supervisorname + "\"\,\""
                + req.body[i].tid + "\"\,\"" +
                req.body[i].password + "\"\,\"ACTIVE\"\,\"0\"\,\"sup\"\)\;\n";
            console.log(insertline);

            db.query(insertline, function (err, result) {
                try {

                } catch (err) {
                    return res.status(401).json("Error happened when excuting StudentListContorller.uploadsupervisorlist.insertline");
                }
            });
            var updateline = "update supervisor set priority = \"" + req.body[i].priority + "\" where tid = \"" + req.body[i].tid + "\""
            console.log(updateline);
            db.query(updateline, function (err, result) {
                try {

                } catch (err) {
                    return res.status(401).json("Error happened when excuting StudentListContorller.uploadsupervisorlist.updateline");

                }
            })
        }
        return res.ok();
    },

    uploadpairlist: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        for (var i = 0; i < req.body.length; i++) {
            console.log("\n\n\n\n\n")
            console.log(req.body[i]);


            thisistheline = "insert IGNORE into allusers values(\"" +
                req.body[i].studentname + "\"\,\""
                + req.body[i].sid + "\"\,\"" +
                req.body[i].stupassword + "\"\,\"ACTIVE\"\,\"0\"\,\"stu\"\)\;\n";
            console.log(thisistheline);
            db.query(thisistheline, function (err, result) {
                if (err) {
                    console.log("error happened at StudentListContorller: uploadpairlist");
                    res.status(401).json("Error happened when excuting : " + thisistheline);
                };
                console.log("1 stu record inserted");


            });
            thisistheline = "insert IGNORE into supervisorpairstudent values(\"" +
                req.session.userid + "\"\,\""
                + req.body[i].sid + "\"\,\"" +
                req.body[i].topic + "\"\);";
            db.query(thisistheline, function (err, result) {
                if (err) {
                    console.log("error happened at StudentListContorller: uploadpairlist");
                    res.status(401).json("Error happened when excuting : " + thisistheline);

                };
                console.log("1 suppairstu record inserted");
            });

        }





        for (var i = 0; i < req.body.length; i++) {


            thisistheline = "insert IGNORE into allusers values(\"" +
                req.body[i].observername + "\"\,\""
                + req.body[i].oid + "\"\,\"" +
                req.body[i].obspassword + "\"\,\"ACTIVE\"\,\"0\"\,\"obs\"\)\;\n";
            console.log(thisistheline);
            db.query(thisistheline, function (err, result) {
                console.log(thisistheline);
                if (err) {
                    console.log("error happened at StudentListContorller: uploadpairlist");
                    res.status(401).json("Error happened when excuting : " + thisistheline);
                };
                console.log("1 obs record inserted");
            });
            thisistheline = "insert IGNORE into supervisorpairobserver values(\"" +
                req.session.userid + "\"\,\""
                + req.body[i].oid + "\"\);";
            db.query(thisistheline, function (err, result) {
                if (err) {
                    console.log("error happened at StudentListContorller: uploadpairlist");
                    res.status(401).json("Error happened when excuting : " + thisistheline);

                };
                console.log("1 suppairobs record inserted");
            });

        }
        console.log("\n\n\n\n\n")

        for (var i = 0; i < req.body.length; i++) {

            thisistheline = "insert IGNORE into observerpairstudent values(\"" +
                req.body[i].oid + "\"\,\""
                + req.body[i].sid + "\"\);";
            db.query(thisistheline, function (err, result) {
                if (err) {
                    console.log("error happened at StudentListContorller: uploadpairlist");
                    res.status(401).json("Error happened when excuting : " + thisistheline);

                };
                console.log("1 obspairstud record inserted");
            });

        }

        return res.ok();


    },

    checkuploadstudentlistdeadline: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var thisistheline = "select * from allsupersetting where typeofsetting = \"5\" and Announcetime is not null"
        db.query(thisistheline, function (err, result) {
            try {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                var deadlinedate;
                var deadlinetime;
                var finaldate;

                if (json.length > 0) {
                    deadlinedate = new Date(json[0].deadlinedate);
                    deadlinetime = json[0].deadlinetime.split(":");
                    deadlinedate.setHours(deadlinetime[0]);
                    deadlinedate.setMinutes(deadlinetime[1]);
                    deadlinedate.setSeconds(deadlinetime[2]);
                    finaldate = deadlinedate;
                } else {
                    finaldate = undefined
                }
                console.log(json);
                return res.view('user/uploadstudentlist', { checkdate: finaldate });
            } catch (err) {
                console.log("error happened at StudentListContorller: checkuploadstudentlistdeadline");
            }
        })
    },

    generateobs: async function (req, res) {
        var db = await sails.helpers.database();
        var pool = await sails.helpers.database2();
        var thisistheline = "select supervisor.supname, supervisor.tid, count(supervisorpairstudent.tid) as stdnum from supervisor left join supervisorpairstudent on supervisor.tid = supervisorpairstudent.tid group by supervisor.tid  order by stdnum desc"
        db.query(thisistheline, function (err, result) {
            try {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                var supstdnumlist = json;


                thisistheline = "SELECT supervisorpairstudent.tid,supervisorpairstudent.sid,observerpairstudent.OID FROM supervisorpairstudent left join observerpairstudent on observerpairstudent.sid = supervisorpairstudent.sid"
                db.query(thisistheline, function (err, result) {
                    try {
                        var string = JSON.stringify(result);
                        var json = JSON.parse(string);
                        var pairinglist = json;

                        var hvstdSUPER = [];
                        var nostdSUPER = [];


                        for (var a = 0; a < supstdnumlist.length; a++) {
                            if (parseInt(supstdnumlist[a].stdnum) > 0) {
                                hvstdSUPER.push(supstdnumlist[a])
                            } else {
                                nostdSUPER.push(supstdnumlist[a])
                            }
                        }

                        var checkallstdhvobs = 0;
                        console.log(hvstdSUPER)
                        console.log(pairinglist)
                        for (var a = 0; a < pairinglist.length; a++) {

                            for (var b = 0; b < hvstdSUPER.length; b++) {
                                if (pairinglist[a].tid != hvstdSUPER[b].tid && parseInt(hvstdSUPER[b].stdnum) != 0) {
                                    hvstdSUPER[b].stdnum = parseInt(hvstdSUPER[b].stdnum) - 1;
                                    pairinglist[a].OID = hvstdSUPER[b].tid;
                                    pairinglist[a].obsname = hvstdSUPER[b].supname
                                    checkallstdhvobs++;
                                }
                            }
                        }
                        if (checkallstdhvobs != pairinglist.length) {
                            for (var a = 0; a < pairinglist.length; a++) {
                                if (pairinglist[a].OID == null) {
                                    var index = Math.floor(Math.random() * nostdSUPER.length);
                                    pairinglist[a].OID = nostdSUPER[index].tid
                                    pairinglist[a].obsname = nostdSUPER[index].supname
                                }
                            }
                        }

                        for (var a = 0; a < pairinglist.length; a++) {
                            thisistheline = "insert ignore into observerpairstudent(obsname,oid,sid) values(\"" + pairinglist[a].obsname + "\",\"" + pairinglist[a].OID + "\",\"" + pairinglist[a].sid + "\")"
                            console.log(thisistheline)
                            db.query(thisistheline, function (err, result) { if (err) { console.log("error happened at StudentListContorller: generateobs"); } })
                        }

                        console.log(pairinglist)
                        return res.status(200).json("ok");

                    } catch (err) {
                        console.log("error happened at StudentListContorller: generateobs");
                    }
                });
            } catch (err) {
                console.log("error happened at StudentListContorller: generateobs");
            }
        });

    },

}