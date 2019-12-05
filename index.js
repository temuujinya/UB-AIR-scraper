const express = require('express');
const CronJob = require('cron').CronJob;
const app = express();

const {PORT, NEWSMN_CRON_HOUR} = require('./config/config');
const scraperRoutes = require('./routes/scraper');

const newsScrapper = require("./controller/newsmn");

const job = new CronJob(`* ${NEWSMN_CRON_HOUR} * * *`,async ()=>{
    console.log("hello kkk",new Date().getSeconds());
    //  newsScrapper.scrapeData();
});
job.start();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/scraper', scraperRoutes);


app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}!`);
})

