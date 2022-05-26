/*

path: api/login/

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth_controller');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();


//Create user
router.post('/new',
[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty().isEmail().withMessage('Email invalido'),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateFields
], 
createUser);





//Login user
router.post('/',
[       
    check('email','El email es obligatorio').not().isEmpty().isEmail().withMessage('Email invalido'),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateFields
], 
login);

//Renew token
router.get('/renew', validateJWT ,renewToken);


module.exports = router;