const express = require('express');
const CronJob = require('cron').CronJob;
const app = express();

const {PORT, NEWSMN_CRON_HOUR, UB_TIME_ZONE} = require('./config/config');
const scraperRoutes = require('./routes/scraper');

const newsScrapper = require("./controller/newsmn");

const job = new CronJob(`0 ${NEWSMN_CRON_HOUR} * * *`,async ()=>{
    console.log("hello kkk",new Date().getSeconds());
     newsScrapper.scrapeData();
},null,true,UB_TIME_ZONE);
job.start();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/scraper', scraperRoutes);


app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}!`);
})

