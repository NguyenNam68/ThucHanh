const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.post('/add', siteController.add)
router.use('/add', siteController.ViewAdd);
router.post('/edit/:id', siteController.update);
router.use('/edit/:id', siteController.ViewEdit);
router.use('/delete/:id', siteController.delete);
router.use('/', siteController.index);

module.exports = router;