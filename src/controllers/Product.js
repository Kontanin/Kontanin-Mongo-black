const ProductActivation = require('../model/Product');

const CreateProduct = async (req, res) => {
  try {
    let {
      Name,
      Description,
      Stock,
      Status,
      Price,
      FreeShipping,
      Company,
      Category,
    } = req.body;
    let obj = {
      Name: Name,
      Description: Description,
      Stock: Stock,
      Status: Status,
      Price: Price,
      FreeShipping: FreeShipping,
      Company: Company,
      Category: Category,
    };
    const product = await ProductActivation.create(obj);
    return res.json(product).status(200);
  } catch (e) {
    console.log(e);
    return res.json(e).status(200);
  }
};
const Productlist = async (req, res) => {
  try {
    const products = await ProductActivation.find({});

    res.status(200).json({ products, count: products.length });
  } catch (e) {
    res.status(400).json('something wrong');
  }
};

const EditProduct = async (req, res) => {
  const id = req.params.id;

  console.log(id, 'id');
  let {
    Name,
    Description,
    Stock,
    Status,
    Price,
    FreeShipping,
    Company,
    Category,
  } = req.body;
  let obj = {
    Name: Name,
    Description: Description,
    Stock: Stock,
    Status: Status,
    Price: Price,
    FreeShipping: FreeShipping,
    Company: Company,
    Category: Category,
  };

  const product = await ProductActivation.findByIdAndUpdate(id, obj, {
    new: true,
  });

  if (!product) {
    res.status(400).send('not found');
  }
  return res.status(200).send({ product });
};

const DeleteProduct = async (req, res) => {
  const id = req.params.id;

  const product = await ProductActivation.findByIdAndDelete(id);
  if (!product) {
    return res.status(400).json('not found');
  }

  return res.status(200).json(product);
};

const OneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await ProductActivation.findById(id);

  return res.status(200).json(product);
};

const uploadSingleImage = async (req, res) => {
  console.log('doine');
  let file = req.file;
  console.log(file);
  if (!file) {
    res.status(400).send({mes:'Plese upload files'});
  } else {
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
