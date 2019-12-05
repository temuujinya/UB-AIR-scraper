const express = require('express');
const router = express.Router();

const scraperController = require('../controller/scraper');

router.get('/',(req,res)=>{
    res.send("hello hhe it's me of course");
});

router.get('/:SITE',scraperController.identifySource);

module.exports = router;