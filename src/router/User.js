const express = require('express');
const {
  Register,
  Login,
  DeleteUser,
  UpdateUser,
  Information,
  UpdateInformation
  ,Userlist
} = require('../controllers/User');
const router = express.Router();

router.post('/Register', Register);
router.post('/Login', Login);
router.delete('/Delete/:id', DeleteUser);
router.patch('/Update/:id', UpdateUser);
router.get('/Information/:id', Information);
router.patch('/Information/:id',UpdateInformation);
router.get('/Alluser',Userlist)
module.exports = router;
