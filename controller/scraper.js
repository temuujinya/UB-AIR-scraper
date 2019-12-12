const newsmn = require("./newsmn");
const ikonmn = require("./ikonmn");
const fs = require('fs');
const {readFromJsonFile,getLastCreatedFileName} = require("./workingWithFile");

const identifySource = async (req,res)=>{
    if(req.params.SITE.toLowerCase()==="news.mn"){
        let newsData = await newsmn.scrapeData();
        res.status(200).json(newsData);
    }else if(req.params.SITE.toLowerCase()==="ikon.mn"){
        let ikonData = await ikonmn.scrapeData();
        res.status(200).json(ikonData);
    }else{
        res.send("Something wrong scraping ikon.mn");
    }
}

const displayJsonData = async (req,res)=>{
    const siteName=req.params.SITE.toLowerCase();
    if(siteName==="news.mn"){
        const lastFileName = getLastCreatedFileName(`${siteName}/`,(err,fileName)=>{
            if(err) throw err;
            
            readFromJsonFile(`${siteName}/${fileName}`,(err,data)=>{
                if(err){
                    console.log(err);
                    return;
                }
                res.status(200).json(data);
            });
        })
    }else if(siteName==="ikon.mn"){
        const lastFileName = getLastCreatedFileName(`${siteName}/`,(err,fileName)=>{
            if(err) throw err;
            
            readFromJsonFile(`${siteName}/${fileName}`,(err,data)=>{
                if(err){
                    console.log(err);
                    return;
                }
                res.status(200).json(data);
            });
        })
    }
    else{
        res.send("Something wrong");
    }
    
}


module.exports={
    identifySource,
    displayJsonData
}