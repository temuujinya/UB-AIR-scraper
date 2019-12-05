const express = require('express');
const app = express();

const {PORT} = require('./config/config');
const scraperRoutes = require('./routes/scraper');

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/scraper', scraperRoutes);


app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}!`);
})

