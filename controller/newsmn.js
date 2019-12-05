/*
working with date
https://usefulangle.com/post/187/nodejs-get-date-time
*/
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs');


const error = chalk.bold.red;
const success = chalk.keyword("green");

let browser;

const scrapeData = async ()=>{
try{
    // open the headless browser
    browser = await puppeteer.launch({headless:false});
    // open a new page
    let page = await browser.newPage();
    // enter url in page
    await page.goto('https://news.mn');
    await page.waitForSelector('div.tw-well-read-container');
    console.log("browser opened");
    let news = await page.evaluate(()=>{
        let postNodeList = document.querySelectorAll('.tw-well-read-container .entry-content-container');
        let titleNodeList = document.querySelectorAll('.tw-well-read-container .entry-content-container h1 a');
        let date = document.querySelectorAll('.tw-well-read-container .entry-content-container div.tw-meta.entry-date')
        // let titleNodeList = document.querySelectorAll(`a.storylink`);

        let titleLinkArray  = [];
        for(let i = 0; i<postNodeList.length; i++){
            
            titleLinkArray[i]={
                title: titleNodeList[i].innerText.trim(),
                link: titleNodeList[i].getAttribute("href"),
                date: date[i].innerText.trim(),
                scrapedDate: Date.now(),
                source: window.location.hostname
            };
        }
        return titleLinkArray;
    });
     page = await browser.newPage();
     let counter=0;   
     for(let post of news){
        try{
            await page.goto(post.link);
            await page.waitForSelector('article.single img:not(.avatar)');
            let moreNews = await page.evaluate(()=>{
                let image = document.querySelector('article.single img:not(.avatar)').getAttribute("src") || null;
                let content = document.querySelector('article.single div.has-content-area').innerText.trim();
                return {image,content};
            })
            Object.assign(news[counter],moreNews);
            counter++;
        }catch(err){
            console.log(error(err))
        }
     }
    await browser.close();
    console.log(success("Browser Closed!;"));
    return news;

}catch(err){
    // catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser closed"));
    // return err;
    console.log(typeof err)
}
};


module.exports={
    scrapeData
}