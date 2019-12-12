const express = require('express');
const CronJob = require('cron').CronJob;
const app = express();

const {PORT, NEWSMN_CRON_HOUR, UB_TIME_ZONE} = require('./config/config');
const scraperRoutes = require('./routes/scraper');

const newsScrapper = require("./controller/newsmn");
const ikonScrapper = require("./controller/ikonmn");

const newsJob = new CronJob(`0 ${NEWSMN_CRON_HOUR} * * *`,async ()=>{
    console.log("news.mn scraping job starting",new Date().getSeconds());
     newsScrapper.scrapeData();
},null,true,UB_TIME_ZONE);

const ikonJob = new CronJob(`0 ${IKONMN_CRON_HOUR} * * *`,async ()=>{
    console.log("ikon.mn scraping job starting",new Date().getSeconds());
     ikonScrapper.scrapeData();
},null,true,UB_TIME_ZONE);

newsJob.start();
ikonJob.start();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/scraper', scraperRoutes);


app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}!`);
})

