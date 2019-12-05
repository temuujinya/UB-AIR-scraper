const express = require('express');
const router = express.Router();

const scraperController = require('../controller/scraper');

router.get('/',(req,res)=>{
    res.send("hello hhe it's me of course");
});

router.post('/:SITE',scraperController.identifySource);
router.get('/:SITE',scraperController.displayJsonData);

module.exports = router;