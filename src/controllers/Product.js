const ProductActivation = require('../model/Product');
const CustomError = require('../errors');

const CreateProduct = async (req, res) => {
  let {
    name,
    description,
    stock,
    Status,
    price,
    freeShipping,
    company,
    category,
  } = req.body;
  let obj = {
    name,
    description,
    stock,
    Status,
    price,
    freeShipping,
    company,
    category,
  };
  const product = await ProductActivation.create(obj);
  return res.json(product).status(200);
};
const Productlist = async (req, res) => {
  const products = await ProductActivation.find({});

  res.status(200).json({ products, count: products.length });
};

const EditProduct = async (req, res) => {
  const id = req.params.id;
  let {
    name,
    description,
    stock,
    status,
    price,
    freeShipping,
    company,
    category,
  } = req.body;
  let obj = {
    name,
    description,
    stock,
    status,
    price,
    freeShipping,
    company,
    category,
  };

  const product = await ProductActivation.findByIdAndUpdate(id, obj, {
    new: true,
  });

  if (!product) {
    return res.status(400).send({ msg: 'not found' });
  }
  return res.status(200).send({ product });
};

const DeleteProduct = async (req, res) => {
  const id = req.params.id;

  const product = await ProductActivation.findByIdAndDelete(id);
  if (!product) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  return res.status(200).json(product);
};

const OneProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id, 'id');
  const product = await ProductActivation.findById(id);

  return res.status(200).json(product);
};

const uploadSingleImage = async (req, res) => {
  let file = req.file;
  if (!file) {
    console.log('pass');
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  } else {
    console.log(res.body);

    res.status(200).send({
      file,
    });
  }
};

module.exports = {
  CreateProduct,
  EditProduct,
  DeleteProduct,
  Productlist,
  OneProduct,
  uploadSingleImage,
};
