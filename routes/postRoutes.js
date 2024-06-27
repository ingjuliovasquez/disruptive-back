const { Router } = require('express');
const postController = require('../controllers/postController');
const { checkPermissions } = require("../middleware/checkPermissions")

const router = Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', checkPermissions(['admin', 'publisher']), postController.createPost);
router.put('/:id', checkPermissions(['admin', 'publisher']), postController.updatePost);
router.delete('/:id', checkPermissions(['admin']), postController.deletePost);

module.exports = router;