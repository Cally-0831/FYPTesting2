/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': { view: 'pages/homepage' },
  '/':"/user/login",
  'GET /home': { view: 'user/home' },
'GET /user/submitrequest': "UserController.submitrequest",
'POST /user/submitrequest': "UserController.submitrequest",

'GET /user/uploadstudentlist': "UserController.uploadstudentlist",
'POST /user/uploadstudentlist': "UserController.uploadstudentlist",

'GET /user/liststudent': "StudentListController.liststudent",
'POST /user/liststudent': "StudentListController.liststudent",
' /user/createnewstudent': { view: 'user/createnewstudent' },

'GET /user/read/:sid': "StudentListController.readsinglestudent",
'POST /user/read/:sid': "StudentListController.deletestudent",

 'GET /user/login':"UserController.login",
 'POST /user/login':"UserController.login",
 'GET /user/logout':'UserController.logout',
 

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};