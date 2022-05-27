/*

path: api/messages

*/

const { Router } = require('express');
const { getMessages } = require('../controllers/messages_controller');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

//Get users
router.get('/:to',validateJWT,getMessages);

module.exports = router;