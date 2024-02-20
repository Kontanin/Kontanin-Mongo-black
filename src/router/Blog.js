const express = require('express');
// require('express-async-errors');
const CustomError = require('../errors');
// const errorHandlerMiddleware = require('../middlewares/error-handler');
const {
  CreateBlog,
  EditBlog,
  DeleteBlog,
  BlogList,
  Blog,
} = require('../controllers/Blog');
const router = express.Router();

// router.use(errorHandlerMiddleware);

router.post('/create', CreateBlog);

router.patch('/edit/:id', EditBlog);
router.delete('/delete', DeleteBlog);
// router.route('/bloglist').get(BlogList);
router.get('/bloglist', async (req, res) => {
  try {
    await BlogList(req, res);
  } catch (e) {
    console.log(e, 'e');
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }
  // throw new CustomError.BadRequestError('Please provide tax and shipping fee');
});
router.get('/blog-id/:id', Blog);

module.exports = router;
