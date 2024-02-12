const UserActivation = require('../model/User');
//done check unique
const Register = async (req, res) => {

  let obj = {
    email: req.body?.email,
    password: req.body?.password,
    fristname: req.body?.fristname,
    lastname: req.body?.lastname,
    address: req.body?.address,
    coutry: req.body?.coutry,
    zipcode: req.body?.zipcode,
    status: 0,
  };
  const find = await UserActivation.findOne(obj);
  if (find) {
    return res.json('e-mail laready have in server').status(400);
  } else {
    await UserActivation.create(obj);
  }

  return res.json('create email').status(200);
};

const Login = async (req, res) => {
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
// done
const DeleteUser = async (req, res) => {
  let obj = {
    email: req.body.email,
    password: req.body.password,
  };
  const find = await UserActivation.findOneAndUpdate(
    { ...obj, status: 0 },
    { status: 900 }
  );
  console.log(find, { obj, status: 0 }, 'find..........');
  if (find) {
    return res.status(200).send('delete');
  } else {
    return res.status(400).send('password not collect');
  }
};

// ยังไม่เสร็จ
const UpdateUser = async (req, res) => {
  const find = await UserActivation.findOneAndUpdate(
    { ...req.body, status: 0 },
    { status: 900 }
  );
  if (find) {
    return res.json('e-mail laready have in server').status(400);
  } else {
    let l = { ...req.body, status: 0 };
    await UserActivation.create(l);
  }

  return res.json('create email').status(200);
};

const Information = async (req, res) => {
  let obj = { email: req.params.id, password: req.body.password };
  const find = await UserActivation.findOne({ ...obj, status: 0 });
  console.log(find);
  if (find) {
    // delete find['password'];
    // console.log(find);
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

const UpdateInformation = async (req, res) => {
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
  let obj = {
    'e-mail': req.params.id,
    status: 0,
    fristname: fristname,
    lastname: lastname,
    address: address,
    coutry: coutry,
    zipcode: zipcode,
  };
  const find = await UserActivation.findOneAndUpdate({ ...obj, status: 0 },{ ...obj, status: 0 });
  if (find) {
    return res.json('success edit data');
  } else {
    return res.json('not found this email').status(400);
  }
};

const Userlist = async (req, res) => {
  const find = await UserActivation.find({ status: 0 });

  if (find) {
    // delete find['password'];
    console.log(find);
    const UserWithOutPass = find.map((user) => {
      let {
        email,
        password,
        status,
        fristname,
        lastname,
        address,
        coutry,
        zipcode,
      } = user;
      let obj = {
        email: email,
        status: 0,
        fristname: fristname,
        lastname: lastname,
        address: address,
        coutry: coutry,
        zipcode: zipcode,
      };

      return obj;
    });

    return res.json(UserWithOutPass);
  } else {
    return res.json('not found this email').status(400);
  }
};

module.exports = {
  Register,
  UpdateUser,
  Login,
  DeleteUser,
  Information,
  UpdateInformation,
  Userlist,
};
