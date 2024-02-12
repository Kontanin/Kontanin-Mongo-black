const express = require('express');
const {
  CreateBlog,
  EditBlog,
  DeleteBlog,
  BlogList,
  Blog,
} = require('../controllers/Blog');
const router = express.Router();

router.post('/Create', CreateBlog);
router.patch('/Edit', EditBlog);
router.delete('/Delete', DeleteBlog);
router.get('/BlogList', BlogList);
router.get('/BlogList:BlogID', Blog);
module.exports = router;
