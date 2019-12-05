const fs = require('fs');
const {JSON_HOME_DIR} = require('../config/config');

const writeToJsonFile = (fileName,data)=>{
    fs.writeFile("./controller/data/"+fileName,JSON.stringify(data),(err)=>{
        if(err) throw err;
        console.log(fileName+" Save!")
    });
}

const readFromJsonFile = async(fileName,callback)=>{

     fs.readFile("./controller/data/"+fileName,(err,data)=>{
        if(err) {
            return callback && callback(err);
        }

        try{
            const object = JSON.parse(data);
            return callback && callback(null,object);
        }catch(err){
            return callback && callback(err);
        }
    });
}
function getLastCreatedFileName(myPath,callback){
    let audioFilePath=JSON_HOME_DIR+myPath;
    fs.readdir(audioFilePath, function(err, files) {
        if (err) { throw err; }
        try{
            const file = getNewestFile(files, audioFilePath);
            return callback && callback(null,file);
        }catch(err){
            return callback && callback(err);
        }
    });
}

function getNewestFile(files, path) {
    var out = [];
    files.forEach(function(file) {
        var stats = fs.statSync(path + "/" +file);
        if(stats.isFile()) {
            out.push({"file":file, "mtime": stats.mtime.getTime()});
        }
    });
    out.sort(function(a,b) {
        return b.mtime - a.mtime;
    })
    return (out.length>0) ? out[0].file : "";
}
module.exports = {
    writeToJsonFile,readFromJsonFile,getLastCreatedFileName
}