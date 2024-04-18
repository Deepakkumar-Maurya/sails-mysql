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

  'POST /createUser': 'UsersController.createUser',
  'GET /users': 'UsersController.getAllUsers',
  'GET /users/:id': 'UsersController.getUser',
  'PUT /users/:id': 'UsersController.updateUser',
  'DELETE /users/:id': 'UsersController.deleteUser',

  'POST /:id/createPost': 'PostController.createPost',
  'GET /:id/posts': 'PostController.getAllPosts',
  'GET /:id/posts/:postId': 'PostController.getPost',
  'PUT /:id/posts/:postId': 'PostController.updatePost',
  'DELETE /:id/posts/:postId': 'PostController.deletePost',


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
