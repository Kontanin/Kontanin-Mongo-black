const express = require('express');

const {
  Register,
  Login,
  DeleteUser,
  UpdateUser,
  Information,
  UpdatePass,
  Userlist,
} = require('../controllers/User');

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);


router.delete('/delete/:id', DeleteUser);
router.patch('/update/:id', UpdateUser);
router.get('/information/:id', Information);
router.patch('/pass/:id', UpdatePass);
router.get('/Alluser/:id', Userlist);
module.exports = router;
