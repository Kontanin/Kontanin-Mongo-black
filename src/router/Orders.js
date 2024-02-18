const express = require('express');
const {
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  Orderlist,
  OrderDetail,
} = require('../controllers/Orders');
const router = express.Router();

router.post('/order', CreateOrder);
router.delete('/delete/:id', DeleteOrder);
router.get('/orderlist', Orderlist);
router.get('/order-by-id/:id', OrderDetail);

router.patch('/update/:id', UpdateOrder);

module.exports = router;
