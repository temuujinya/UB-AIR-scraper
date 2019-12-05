const express = require('express');
const CronJob = require('cron').CronJob;
const app = express();

const {PORT} = require('./config/config');
const scraperRoutes = require('./routes/scraper');

const newsScrapper = require("./controller/newsmn");

const job = new CronJob("* 5,11,16,20 * * *",async ()=>{
    // console.log("hello kkk",new Date().getSeconds());
     newsScrapper.scrapeData();
});
job.start();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/scraper', scraperRoutes);


app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}!`);
})

