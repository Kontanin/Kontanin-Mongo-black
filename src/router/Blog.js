/**
 * @swagger
 * /api/hello:
 *   post:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */

const express = require('express');

const { authentication, authorizePermissions } = require('../middlewares/auth');
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

router.post('/create', authentication, CreateBlog);

router.patch('/edit/:id', authentication, EditBlog);
router.delete('/delete', authentication, DeleteBlog);

router.get('/bloglist', authentication, BlogList);
router.get('/blog-id/:id', authentication, Blog);

module.exports = router;
