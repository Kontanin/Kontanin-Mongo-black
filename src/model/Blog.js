const mongoose = require('mongoose');

const BlogShema = mongoose.Schema({

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
