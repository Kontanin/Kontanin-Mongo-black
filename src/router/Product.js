const express = require('express');
const {
  CreateProduct,
  EditProduct,
  DeleteProduct,
  Productlist,
  ProductDetail,
} = require('../controllers/Product');
const router = express.Router();

router.post('/Create', CreateProduct);
router.patch('/Edit/:ProductId', EditProduct);
router.delete('/Delete/:ProductId', DeleteProduct);
router.get('/Productlist', Productlist);
router.get('/ProductDetail/:ProductId', ProductDetail);
module.exports = router;
