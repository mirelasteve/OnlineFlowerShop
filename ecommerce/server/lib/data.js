const fs = require('fs');
const path = require('path');
const HelperHandlers = require('./handlers/helpers.handlers');

const lib = {};

lib.baseDir = path.join(__dirname,'../data/')

lib.create = (dir,file,data,callback)=>{
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err,fileDes)=>{
        if(!err && fileDes){
            const stringFile = JSON.stringify(data);

            fs.writeFile(fileDes,stringFile,(err)=>{
                if(!err){
                    fs.close(fileDes,(err)=>{
                        if(!err){
                            callback(false)
                        } else {
                            callback('Problem closing')
                        }
                    })
                }else {
                    callback('Problem writing in the file')
                }
            })
        } else {
            console.log(err);
            callback('Could not create new file, it might exists')
        }
    })
}

lib.read = (dir,fileName,callback)=>{
    
    fs.readFile(lib.baseDir+dir+'/'+fileName+'.json','utf8',(err,data)=>{
        
        if(!err && data){
           const parsedData = HelperHandlers.parse(data);
           callback(false,parsedData)
        } else {
           
            callback(err,data) 
        }
       
    })
}

lib.delete = (dir,fileName,callback)=>{
    fs.unlink(lib.baseDir+dir+'/'+fileName+'.json',(err,fileDes)=>{
        if(!err){
            callback(false);
        } else {
            callback('Some error to delete')
        }
    })
}
lib.update = (dir,fileName,newData, callback)=>{
    fs.open(lib.baseDir+dir+'/'+fileName+'.json','r+',(err,fileDes)=>{
        if(!err && fileName){
            const stringFile = JSON.stringify(newData);

            fs.truncate(fileDes,(err)=>{
                if(!err){
                    fs.writeFile(fileDes,stringFile,(err)=>{
                        if(!err){
                            fs.close(fileDes,(err)=>{
                                if(!err){
                                    callback(false)
                                } else {
                                    callback('Érror closing the file')
                                }
                            })
                        } else {
                            callback('Error closing to exist file ')
                        }
                    })
                } else {
                    callback('Error truncating file')
                }
            })
        } else {
            callback('Could not open the ifle for updating, it may not exist yet')
        }
    })
}
module.exports = lib