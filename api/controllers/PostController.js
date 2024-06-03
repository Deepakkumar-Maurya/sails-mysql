/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.params.id;
      console.log(title, content, userId);

      const checkTableQuery = `SHOW TABLES LIKE "posts"`;
      const tableExistsResult = await sails.sendNativeQuery(checkTableQuery);
      // console.log(tableExistsResult);

      // If the table doesn't exist, create it
      if (tableExistsResult.rows.length === 0) {
        const createTableQuery = `
        CREATE TABLE posts (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          );
            `;
        await sails.sendNativeQuery(createTableQuery);
      }

      const insertPostQuery =
        'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)';
      const insertPostResult = await sails.sendNativeQuery(insertPostQuery, [
        title,
        content,
        userId,
      ]);
      console.log(insertPostResult);
      res.status(201).json({
        success: true,
        hasErrors: false,
        message: 'Post created',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        hasErrors: true,
        message: 'Error creating post',
      });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const userId = req.params.id;
      const getAllPostsQuery = 'SELECT title, content FROM posts WHERE user_id = $1';
      const getAllPostsResult = await sails.sendNativeQuery(getAllPostsQuery, [
        userId,
      ]);
      res.status(200).json(getAllPostsResult.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        hasErrors: true,
        message: 'Error getting posts',
      });
    }
  },

  getPost: async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;
      const getPostQuery = 'SELECT title, content FROM posts WHERE id = $1 AND user_id = $2';
      const getPostResult = await sails.sendNativeQuery(getPostQuery, [
        postId,
        userId,
      ]);
      res.status(200).json(getPostResult.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        hasErrors: true,
        message: 'Error getting post',
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;
      const { title, content } = req.body;
      const updatePostQuery =
        'UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND user_id = $4';
      const updatePostResult = await sails.sendNativeQuery(updatePostQuery, [
        title,
        content,
        postId,
        userId,
      ]);
      console.log(updatePostResult);
      res.status(201).json({
        success: true,
        hasErrors: false,
        message: 'Post updated',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        hasErrors: true,
        message: 'Error updating post',
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;
      const deletePostQuery = 'DELETE FROM posts WHERE id = $1 AND user_id = $2';
      const deletePostResult = await sails.sendNativeQuery(deletePostQuery, [
        postId,
        userId,
      ]);
      console.log(deletePostResult);
      res.status(200).json({
        success: true,
        hasErrors: false,
        message: 'Post deleted',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        hasErrors: true,
        message: 'Error deleting post',
      });
    }
  }
};
