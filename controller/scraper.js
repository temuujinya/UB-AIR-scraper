const newsmn = require("./newsmn");

const identifySource = async (req,res)=>{
    if(req.params.SITE.toLowerCase()==="news.mn"){
        let newsData = await newsmn.scrapeData();
        res.status(200).json(newsData);
    }else{
        res.send("Something wrong");
    }
}


module.exports={
    identifySource
}