const { Router } = require('express');
const { newDemo, demo } = require('../controllers/demos.controller');
const { validateFields } = require('../middlewares/validate');

const router = Router();


//create a demo
router.post('/newDemo', validateFields, newDemo)


//get all demo
router.get('/', validateFields, demo)




module.exports = router;

