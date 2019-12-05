const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hello hhe it's me of course");
});

router.get('/:SITE',(req,res)=>{
    res.send(req.params.SITE);
});

module.exports = router;