const express = require('express');
const multer = require('../middlewares/multer');

const {
  CreateProduct,
  EditProduct,
  DeleteProduct,
  Productlist,
  OneProduct,
  uploadSingleImage,
} = require('../controllers/Product');
const router = express.Router();

router.post('/create', CreateProduct);
router.post('/upload', multer.uploadImg.single('image'), uploadSingleImage);
router.patch('/edit/:id', EditProduct);
router.get('/list', Productlist);
router.get('/get/:id', OneProduct);

router.delete('/delete/:id', DeleteProduct);

module.exports = router;
