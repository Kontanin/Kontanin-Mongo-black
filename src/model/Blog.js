const mongoose = require('mongoose');

const BlogShema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  username: {
    type: String,
  },
  tag: {
    type: Array,
  },
  content: {
    type: String,
  },
});
module.exports = mongoose.model('Blog', BlogShema);
