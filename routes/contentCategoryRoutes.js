const { Router } = require('express');
const contentCategoryController = require('../controllers/contentCategoryController');
const { checkPermissions } = require("../middleware/checkPermissions")

const router = Router();

router.get('/', contentCategoryController.getContentCategory);
router.get('/:id', contentCategoryController.getContentsCategories);
router.post('/', checkPermissions(['admin']), contentCategoryController.createContentCategory);
router.put('/:id', checkPermissions(['admin']), contentCategoryController.updateContentCategory);
router.delete('/:id', checkPermissions(['admin']), contentCategoryController.deleteContentCategory);

module.exports = router;