const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, renew } = require('../controllers/auth.controller');
const { validateFields, validateJWT } = require('../middlewares/validate');

const router = Router();


//crear un usuario
router.post('/register', [
    check('email', 'El email es obligatorio').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isStrongPassword(),
    validateFields
], register)



//Login de usuario
router.post('/', validateFields, login)



//validar JWT
router.get('/', validateJWT, renew)






module.exports = router;