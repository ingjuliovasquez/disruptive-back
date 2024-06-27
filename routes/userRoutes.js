const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router.get('/:id', usersController.getUser);

module.exports = router;