const UserActivation = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors');
//done check unique
const Register = async (req, res) => {
  try {
    // filter data
    const {
      email,
      password,
      fristname,
      lastname,
      address,
      coutry,
      zipcode,
      status,
    } = req.body;
    if (!(email && password)) return res.status(400).send({});

    const existUser = await UserActivation.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: 'e-mail already have in server' });
    }
    // encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await UserActivation.create({
      email,
      password,
      role: 'customer',
      fristname,
      lastname,
      address,
      coutry,
      zipcode,
      status,
      password: encryptedPassword,
      isActive: true,
    });

    return res.json({ message: 'create email' }).status(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) return res.status(400).send({});

    const user = await UserActivation.findOne({ email });
    console.log('user');
    if (!(user && bcrypt.compareSync(password, user.password))) {
      // throw new CustomError.BadRequestError(
      //   'Please provide tax and shipping fee'
      // );
    }

    console.log('e');
    const token = jwt.sign(
      {
        id: user._id,
        role: 'customer',
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    const data = {
      role: user.role,
      id: user._id,
      token,
    };
    console.log('try');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    throw new CustomError.BadRequestError(String(error));
  }
};

// done
const DeleteUser = async (req, res) => {
  await UserActivation.findByIdAndUpdate(id, {
    isActive: false,
  });
  return res.status(200).send({ message: 'deleted' });
};

// ยังไม่เสร็จ
const UpdateUser = async (req, res) => {
  const id = req.params.id;
  let {
    email,
    password,
    status,
    fristname,
    lastname,
    role,
    address,
    coutry,
    zipcode,
  } = req.body;

  const find = await UserActivation.findByIdAndUpdate(
    id,
    {
      fristname,
      lastname,
      address,
      role,
      coutry,
      zipcode,
      status,
    },
    { new: true }
  );
  if (!find) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  return res.json(find).status(200);
};

const Information = async (req, res) => {
  const id = req.params.id;
  const find = await UserActivation.findById(id);
  console.log(find);
  if (find) {
    // delete find['password'];
    console.log(find);
    let {
      email,
      password,
      status,
      fristname,
      lastname,
      role,
      address,
      coutry,
      zipcode,
    } = find;

    let ans = {
      email,
      fristname,
      lastname,
      address,
      role,
      coutry,
      zipcode,
    };
    return res.json(ans);
  } else {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }
};

const UpdatePass = async (req, res) => {
  let { email, password } = req.body;
  const id = req.params.id;
  console.log(req.body, id, req.user);
  if (id !== req.user.id)
    return res.status(400).send({ message: "You can't perform this action" });

  const encryptedPassword = bcrypt.hashSync(password, 10);
  let p = await UserActivation.findByIdAndUpdate(
    id,
    {
      email: email,
      password: encryptedPassword,
    },
    { new: true }
  );

  return res.status(200).send({ message: p });
};
const UpdateRole = async (req, res) => {
  try {
    let { role } = req.body;
    const find = await UserActivation.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    return res.status(200).send({ message: p });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
const Userlist = async (req, res) => {
  const find = await UserActivation.find({ isActive: true });
  return res.status(200).send(find);
};

module.exports = {
  Register,
  UpdateUser,
  Login,
  DeleteUser,
  Information,
  UpdatePass,
  Userlist,
  UpdateRole,
};
