const { Router } = require('express');
const { newDemo, demo, deleteDemo } = require('../controllers/demos.controller');
const { validateFields } = require('../middlewares/validate');

const router = Router();


//create a demo
router.post('/newDemo', validateFields, newDemo)


//get all demo
router.get('/', demo)

//Delete a demos
router.get('/delete/:_id', deleteDemo)

module.exports = router;

