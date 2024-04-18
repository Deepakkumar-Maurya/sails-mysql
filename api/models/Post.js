/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: { type: 'string', required: true },
    content: { type: 'string', columnType: 'text' }, // Using columnType for larger text fields
    // Many-to-one relationship with users
    user: {
      model: 'user',
    },
  },
};


