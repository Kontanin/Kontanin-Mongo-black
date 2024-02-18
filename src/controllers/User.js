const UserActivation = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    console.log('test');
    // encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await UserActivation.create({
      email,
      password,
      fristname,
      lastname,
      address,
      coutry,
      zipcode,
      status,
      password: encryptedPassword,
    });

    return res.json({ message: 'create email' }).status(200);
  } catch (error) {
    res.status(500).send({ message: String(error) });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) return res.status(400).send({});

    const user = await UserActivation.findOne({ email });

    if (!(user && bcrypt.compareSync(password, user.password)))
      return res
        .status(400)
        .send({ message: 'Username or password is incorrect.' });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );

    const data = {
      id: user._id,
      token,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: String(error) });
  }
};

// done
const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (id !== req.user.id)
      return res.status(400).send({ message: "You can't perform this action" });

    await UserActivation.findByIdAndUpdate(id, {
      isActive: false,
    });

    return res.status(200).send({ message: 'deleted' });
  } catch (error) {
    res.status(500).send({ message: String(error) });
  }
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
    address,
    coutry,
    zipcode,
  } = req.body;

  const find = await UserActivation.findByIdAndUpdate(
    id,
    {
      fristname: fristname,
      lastname: lastname,
      address: address,
      coutry: coutry,
      zipcode: zipcode,
      status: status,
    },
    { new: true }
  );
  console.log(find, 'find');
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
      address,
      coutry,
      zipcode,
    } = find;

    let ans = {
      email: email,
      fristname: fristname,
      lastname: lastname,
      address: address,
      coutry: coutry,
      zipcode: zipcode,
    };
    return res.json(ans);
  } else {
    return res.json('not found this email').status(400);
  }
};

const UpdatePass = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: String(error) });
  }
};

const Userlist = async (req, res) => {
  const id = req.params.id;
  console.log(id, 'id');
  const find = await UserActivation.find();

  if (id !== req.user.id)
    return res.status(400).send({ message: "You can't perform this action" });

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
};
