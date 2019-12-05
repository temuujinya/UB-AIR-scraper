const newsmn = require("./newsmn");const fs = require('fs');
const {readFromJsonFile,getLastCreatedFileName} = require("./workingWithFile");

const identifySource = async (req,res)=>{
    if(req.params.SITE.toLowerCase()==="news.mn"){
        let newsData = await newsmn.scrapeData();
        res.status(200).json(newsData);
    }else{
        res.send("Something wrong");
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
    }else{
        res.send("Something wrong");
    }
    
}


module.exports={
    identifySource,
    displayJsonData
}