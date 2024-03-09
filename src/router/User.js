const express = require('express');
const { authentication, authorizePermissions } = require('../middlewares/auth');
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

router.delete('/delete/:id',authentication, DeleteUser);

router.patch('/update/:id',authentication, UpdateUser);
router.patch('/update-role/:id',authentication, UpdateRole);
router.patch('/pass/:id',authentication, UpdatePass);

router.get('/information/:id',authentication, Information);
router.get('/alluser/:id',authentication, Userlist);
module.exports = router;
