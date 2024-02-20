const OrderActivation = require('../model/Orders');
const ProductActivation = require('../model/Product');
const CustomError = require('../errors');

const orderid = require('order-id')('key');
// YYMM-000000
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  StatusPayment = 1;
  return { client_secret, amount, StatusPayment };
};

function pad(num) {
  num = num.toString();
  while (num.length < 6) num = '0' + num;
  return num;
}
const generateOrderId = (OrderId) => {
  let Ordernumber;
  if (OrderId) {
    Ordernumber = pad(parseInt(OrderId.substring(5, 11)) + 1);
  } else {
    Ordernumber = pad(1);
  }
  let date = new Date();
  let year = date.getUTCFullYear().toString().substring(2, 4);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  let orderid = year + month + '-' + Ordernumber.toString();
  return orderid;
};

const CreateOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    return res.status(400).send({ msg: 'No cart items provided' });
  }
  if (!tax || shippingFee === 'undefined') {
    return res.status(400).send({ msg: 'Please provide tax and shipping fee' });
  }
  let OrderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await ProductActivation.findById(item._id);
    if (!dbProduct) {
      return res.status(400).send({ msg: 'done' });
    }

    const { name, price, _id } = dbProduct || {};
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,

      product: _id,
    };
    // // add item to order
    OrderItems = [...OrderItems, singleOrderItem];
    // // calculate subtotal
    subtotal += item.amount * price;
  }

  let p = await OrderActivation.find({}).sort({ OrderId: -1 }).limit(1);

  let OrderId = generateOrderId(p[0]?.OrderId);

  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });
  let status;
  if (paymentIntent.StatusPayment) {
    status = 'paid';
  } else {
    status = 'pending';
  }
  console.log(OrderItems, 'orderItems');
  const order = await OrderActivation.create({
    OrderId,
    OrderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    status,
    user: req.user.id,
  });


  return res.json(order).status({ msg: 'create orders sussess' });
};

const UpdateOrder = async (req, res) => {
  const id = req.params.id;
  const { status, shippingFee, paymentIntentId, OrderItems, total } = req.body;

  const find = await OrderActivation.findByIdAndUpdate(
    id,
    {
      status: status,
      shippingFee: shippingFee,
      OrderItems: OrderItems,
      total: total,
    },
    { new: true }
  );

  if (find) {
    res.status(200).send({ msg: find });
  } else {
    res.status(400).send({ msg: 'not done' });
  }
};

const DeleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    await OrderActivation.deleteOne({ _id: id });

    return res.status(200).send({ message: 'deleted' });
  } catch (error) {
    res.status(500).send({ message: error});
  }
};

const Orderlist = async (req, res) => {
  try {
    const orders = await OrderActivation.find({});
    res.status(200).json({ orders, count: orders.length });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};
const OrderDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await OrderActivation.findById(id);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};
module.exports = {
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  Orderlist,
  OrderDetail,
};
