const ProductActivation = require('../model/Product');

const CreateProduct = async (req, res) => {
  console.log(req.body, 'req');
  let obj = { email: req.body.email, status: 0 };
  try {
    const find = await ProductActivation.findOne(obj);

    if (find) {
      return res.json('Products laready have in server').status(400);
    } else {
      let l = { ...req.body, status: 0 };
      console.log(l, 'l');
      await ProductActivation.create(l);
    }
  } catch (e) {
    console.log(e);
  }

  return res.json('create email').status(200);
};

const EditProduct = async (req, res) => {
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

const DeleteProduct = async (req, res) => {
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

const Productlist = async (req, res) => {};
const ProductDetail = async (req, res) => {};

module.exports = {
  CreateProduct,
  EditProduct,
  DeleteProduct,
  Productlist,
  ProductDetail,
};
