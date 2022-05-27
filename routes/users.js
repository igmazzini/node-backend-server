/*

path: api/users

*/

const { Router } = require('express');
const { getUsers } = require('../controllers/users_controller');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

//Get users
router.get('/',validateJWT,getUsers);

module.exports = router;