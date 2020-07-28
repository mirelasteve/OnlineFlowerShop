 const crypto = require('crypto');
 const config = require('../../config/keys');
 HelpersHandlers = {}
  
 HelpersHandlers.checkStringAndLength= (data) => {
        
        return typeof (data) === 'string'&& data.length > 0
                                ? data
                                : false
    
}
HelpersHandlers.checkIsEmail = (email)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())){
        return email
    } else {
        return false
    }
}

HelpersHandlers.checkIsToken = (tokenId) =>{
    console.log(tokenId.length)
    if(tokenId.length === 20 && typeof(tokenId) === 'string'){
        return tokenId
    } else {
        return false
    }
}

HelpersHandlers.isTrue = (bool) =>{
    if(typeof(bool) === 'boolean' && bool === true){
        return true
    } else {
        return false
    }
}
HelpersHandlers.hash = (password)=>{
    if(password){
        
        const hash =crypto.createHmac('sha256',config.hashingSecret).update(password).digest('hex');
        return hash;
    }
}
HelpersHandlers.createToken = (strLen) =>{
    if(strLen > 1){
        let str = '';
        let posibbleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let counter = 0;
        while(counter <strLen){
            let randomChar = posibbleChars.charAt(Math.floor(Math.random() * posibbleChars.length));
            str+=randomChar;
            counter+=1;
           
        }
        
        return str
    } else {
        return false
    }
}
HelpersHandlers.parse = (obj)=>{
    if(obj){
        return JSON.parse(obj);
    } else {
        return ({})
    }
}
HelpersHandlers.isProtocol = (protocol) =>{
    if(typeof(protocol)==='string' &&['https','http'].indexOf(protocol) > -1){
        return protocol
    } else {
        return false
    }
}
HelpersHandlers.isUrl = (url) =>{
    if(typeof(url)==='string' && url.length>0){
        return url
    } else {
        return false
    }
}
HelpersHandlers.isMethod = (method) =>{
    if(typeof(method)==='string' && ['POST','GET','DELETE','PUT'].indexOf(method) > -1){
        return method
    } else {
        return false
    }
}
HelpersHandlers.isSuccessCodes = (code) => {
    if(typeof(code)==='object' && code instanceof Array && code.length>0){
        return code
    } else {
        return false
    }
}
HelpersHandlers.isTimeoutSeconds = (seconds) => {
    if(typeof(seconds)==='number' && seconds % 1 === 0 && seconds >= 1 && seconds < config.maxChecks){
        return seconds
    } else {
        return false
    }
}
module.exports = HelpersHandlers