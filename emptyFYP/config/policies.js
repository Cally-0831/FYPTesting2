/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const SchduleController = require("../api/controllers/SchduleController");

module.exports.policies = {
  "*":"isLoggedin",
  

  UserController: {
    login: true,
    uploadstudentlist: "isSuper",
    uploadsupervisorlist:"isAdmin",
  },
  TimetableController: {
    "*":"isLoggedin",
    judgettb: "isSuper",
    readsinglestudentttb: "isSuper"
  },
  StudentListController: {
    "*": "isSuser"
  },
  SettingController: {
    "*": "isAdmin"
  },
  RequestController: {
    liststudentrequest: "isSuper",
    
    replystudentrequest:"isSuper"
  },
 NoticeListController:{
  addnotice :"isSUser",
  viewnoticepage:"isSUser"
 },
 
  ClassroomListController: {
    '*': "isAdmin"
  },
  SchduleController:{
    viewfinalschdule :"isLUser"
  },

  LessonListController:{
    '*': "isAdmin"
  }

  

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

};
