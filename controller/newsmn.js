/*
working with date
https://usefulangle.com/post/187/nodejs-get-date-time
*/
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');
const {writeToJsonFile} = require("./workingWithFile");


const error = chalk.bold.red;
const success = chalk.keyword("green");

let browser;

const scrapeData = async ()=>{
try{
    // open the headless browser
    browser = await puppeteer.launch({headless:true});
    // open a new page
    let page = await browser.newPage();
    // enter url in page
    await page.goto('https://news.mn');
    await page.waitForSelector('#latest-news .tw-well-read-container');
    console.log("browser opened");
    let news = await page.evaluate(()=>{
        let titleNodeList = document.querySelectorAll('#latest-news .tw-well-read-container .entry-content-container h1 a');
        let date = document.querySelectorAll('#latest-news .tw-well-read-container .entry-content-container div.tw-meta.entry-date')
        // let titleNodeList = document.querySelectorAll(`a.storylink`);

        let titleLinkArray  = [];
        for(let i = 0; i<5; i++){
            
            titleLinkArray[i]={
                title: titleNodeList[i].innerText.trim(),
                link: titleNodeList[i].getAttribute("href"),
                date: date[i].innerText.trim(),
                scrapedDate: Date.now(),
                source: window.location.hostname
            };
        }
        return {
                posts:titleLinkArray, 
                };
    });
     page = await browser.newPage();
     let counter=0;   
     for(let post of news.posts){
        try{
            await page.goto(post.link);
            await page.waitForSelector('article.single img:not(.avatar)');
            let moreNews = await page.evaluate(()=>{
                let image = document.querySelector('article.single img:not(.avatar)').getAttribute("src") || null;
                let content = document.querySelector('article.single div.has-content-area').innerText.trim();
                return {image,content};
            })
            Object.assign(news.posts[counter],moreNews);
            counter++;
        }catch(err){
            console.log(error(err))
        }
     }
    await browser.close();
    console.log(success("Browser Closed!;"));

    Object.assign(news, {fileCreated:Date.now()})
    let date = new Date();
    writeToJsonFile(`news.mn/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}.json`,news);
    return news;

}catch(err){
    // catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser closed"));
    scrapeData();
}
};




module.exports={
    scrapeData
}