const express = require('express');

const {
  Register,
  Login,
  DeleteUser,
  UpdateUser,
  Information,
  UpdatePass,
  Userlist,
  UpdateRole,
} = require('../controllers/User');

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);

router.delete('/delete/:id', DeleteUser);

router.patch('/update/:id', UpdateUser);
router.patch('/update-role/:id', UpdateRole);
router.patch('/pass/:id', UpdatePass);

router.get('/information/:id', Information);

router.get('/Alluser/:id', Userlist);
module.exports = router;
