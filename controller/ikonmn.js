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
    await page.goto('https://ikon.mn');
    await page.waitForSelector('.lmcontainer.lmcontainerhome');
    console.log("browser opened");
    let news = await page.evaluate(()=>{
        let titleNodeList = document.querySelectorAll('.lmcontainer.lmcontainerhome .newslist .nltitle a');
        let imageSrcList = document.querySelectorAll('.lmcontainer.lmcontainerhome ul.newslist li img');
        let date = document.querySelectorAll('.lmcontainer.lmcontainerhome .newslist .dtime span.ikon-back-in-time')
        // let titleNodeList = document.querySelectorAll(`a.storylink`);

        let titleLinkArray  = [];
        for(let i = 0; i<20; i++){
            
            titleLinkArray[i]={
                title: titleNodeList[i].innerText.trim(),
                link: "https://"+window.location.hostname+titleNodeList[i].getAttribute("href"),
                date: date[i].getAttribute('rawdate'),
                scrapedDate: Date.now(),
                image:imageSrcList[i].getAttribute("src"),
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
            await page.waitForSelector('.inews .icontent');
            let moreNews = await page.evaluate(()=>{
                let content = document.querySelector('.inews .icontent').innerText.trim();
                return {content};
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
    writeToJsonFile(`ikon.mn/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}.json`,news);
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