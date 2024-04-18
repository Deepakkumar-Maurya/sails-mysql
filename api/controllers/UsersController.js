/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const checkTableQuery = 'SHOW TABLES LIKE "users"';
      const tableExistsResult = await sails.sendNativeQuery(checkTableQuery);
      // console.log(tableExistsResult);
      // If the table doesn't exist, create it
      if (tableExistsResult.rows.length === 0) {
        const createTableQuery = `
          CREATE TABLE users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
          )
            `;
        await sails.sendNativeQuery(createTableQuery);
      }

      // If the table exists, insert the new user
      const insertUserQuery =
        'INSERT INTO Users (username, email) VALUES ($1, $2)';
      const insertUserResult = await sails.sendNativeQuery(insertUserQuery, [
        username,
        email,
      ]);
      console.log(insertUserResult);
      res.status(201).send('User created');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error creating user');
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const getAllUsersQuery = 'SELECT * FROM users';
      const getAllUsersResult = await sails.sendNativeQuery(getAllUsersQuery);
      res.status(200).send(getAllUsersResult.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error getting users');
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const getUserQuery = 'SELECT * FROM users WHERE id = $1';
      const getUserResult = await sails.sendNativeQuery(getUserQuery, [id]);
      res.status(200).send(getUserResult.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error getting user');
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const updateUserQuery =
        'UPDATE users SET username = $1, email = $2 WHERE id = $3';
      const updateUserResult = await sails.sendNativeQuery(updateUserQuery, [
        username,
        email,
        id
      ]);
      console.log(updateUserResult);
      res.status(200).send('User updated');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error updating user');
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUserQuery = 'DELETE FROM users WHERE id = $1';
      const deleteUserResult = await sails.sendNativeQuery(deleteUserQuery, [
        id,
      ]);
      console.log(deleteUserResult);
      res.status(200).send('User deleted');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error deleting user');
    }
  }
};

