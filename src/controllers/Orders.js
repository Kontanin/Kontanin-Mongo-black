const OrderActivation = require('../model/Orders');

const CreateOrder = async (req, res) => {
  console.log(req.body, 'req');
  let obj = { email: req.body.email, status: 0 };
  const find = await UserActivation.findOne(obj);
  if (find) {
    return res.json('e-mail laready have in server').status(400);
  } else {
    let l = { ...req.body, status: 0 };
    console.log(l, 'l');
    await UserActivation.create(l);
  }

  return res.json('create email').status(200);
};

const UpdateOrder = async (req, res) => {
  let obj = { email: req.body.email };

  const find = await UserActivation.findOne({ ...obj, status: 0 });
  if (find) {
    const check = await UserActivation.findOne({ ...req.body, status: 0 });
    if (check) {
      res.status(200).send('log in succes');
    } else {
      res.status(400).send('wrong password');
    }
  } else {
    res.status(400).send('do not have this account in sever');
  }
};

const DeleteOrder = async (req, res) => {
  let obj = { email: req.body.email };

  const findEmil = await UserActivation.findOne(obj);

  if (findEmil) {
    const find = await UserActivation.findOneAndUpdate(
      { ...req.body, status: 0 },
      { ...req.body, status: 900 }
    );

    console.log(find, { ...req.body, status: 0 }, 'find..........');
    if (find) {
      return res.status(200).send('delete');
    } else {
      return res.status(400).send('password not collect');
    }
  }
  return res.status(400).send('not found');
};

const Orderlist = async (req, res) => {};
const OrderDetail = async (req, res) => {};
module.exports = {
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
  Orderlist,
  OrderDetail,
};