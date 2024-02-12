const express = require('express');
const {
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  Orderlist,
  OrderDetail,
} = require('../controllers/Orders');
const router = express.Router();

router.post('/Order', CreateOrder);
router.patch('/Update', UpdateOrder);
router.delete('/Delete', DeleteOrder);
router.get('/Orderlist', Orderlist);
router.get('/Orderlist/:OrderId', OrderDetail);

module.exports = router;
