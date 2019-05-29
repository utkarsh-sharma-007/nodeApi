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

  '/': { view: 'pages/homepage' },
  'post  /register': 'UserController.register',
  'post  /login': 'UserController.login',
  'get  /logout': 'UserController.logout',
  'post  /activate': 'UserController.activateAccount',
  'get  /getUserDetails': 'UserController.getUserDetails',
  'post  /sendResetPass': 'UserController.sendResetPass',
  'post  /resetPass': 'UserController.resetPass',
  'post  /updateUserDetails': 'UserController.updateUserDetails',
  'post  /addOrUpdateUserDevice': 'UserController.addOrUpdateUserDevice',
  'post  /addOrUpdateUserEducation': 'UserController.addOrUpdateUserEducation',
  'post  /addOrUpdateUserKnowledge': 'UserController.addOrUpdateUserKnowledge',
  'post  /addOrUpdateUserPersonalInfo': 'UserController.addOrUpdateUserPersonalInfo',
  'post  /addOrUpdateUserSocial': 'UserController.addOrUpdateUserSocial',
  'get  /getUserList': 'UserController.getUserList',
  'post  /requestEducator': 'UserController.requestEducator',
  'post  /deleteRequest': 'UserController.deleteRequest',
  // 'get  /hello': 'UserController.hello',


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
