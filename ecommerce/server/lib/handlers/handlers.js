const _data = require('../data');
const HelpersHandlers = require('./helpers.handlers');
const keys = require('../../config/keys');
const handlers = {} ; 
   
    handlers.sample = (data,callback)=>{
        callback(406,{'name':'hihi hi'})
    }

    handlers.users = (data,callback)=>{
        const acceptableMethods = ['POST','GET','DELETE','PUT'];
        
        if(acceptableMethods.indexOf(data.method) > -1){
            handlers._users[data.method](data,callback);
        } else {
            callback(405)
        }
    }

    handlers.tokens = (data,callback)=>{
        const acceptableMethods = ['POST','GET','DELETE','PUT'];
        
        if(acceptableMethods.indexOf(data.method) > -1){
            handlers._tokens[data.method](data,callback);
        } else {
            callback(405)
        }
    }

    handlers.checks = (data,callback)=>{
        const acceptableMethods = ['POST','GET','DELETE','PUT'];
        
        if(acceptableMethods.indexOf(data.method) > -1){
            handlers._checks[data.method](data,callback);
        } else {
            callback(405)
        }
    }

    handlers._users = {};
    handlers._tokens = {};
    handlers._checks = {};


    handlers._users.POST = (data,callback)=>{
        const checkData = HelpersHandlers.parse(data.payload);
        
        const firstName = HelpersHandlers.checkStringAndLength(checkData.firstName)
        const lastName = HelpersHandlers.checkStringAndLength(checkData.lastName)
        const password = HelpersHandlers.checkStringAndLength(checkData.password)
        const email = HelpersHandlers.checkIsEmail(checkData.email)
        if(firstName && lastName && password && email){
            _data.read('users',email,(err,data)=>{
                if(err){
                    
                    const hashedPassword = HelpersHandlers.hash(password);
                    if(hashedPassword){
                        const userObject = {
                            "firstName":firstName,
                            "lastName":lastName,
                            "email":email,
                            "hashedPassword":hashedPassword
                        }
                        _data.create('users',email,userObject,(err)=>{
                            if(!err){
                                callback(200)
                            } else {
                                
                                callback(500,err)
                            }
                            })
                     } else {
                         callback(500,{"Error":"Problem with hashing"})
                     }
                    
                } else {
                    callback(409, 'this user already exists')
                }
            })
        } else {
            callback(422,'Wrong data')
        }
    }

    //@TODO only let authenticte users to read data
    handlers._users.GET = (data,callback)=>{
        
        const email = HelpersHandlers.checkIsEmail(data.query.email)
        if(email){
            
            const token = typeof(data.headers.token) ==='string' ? data.headers.token : false;
            if(token){
                _data.read('users',email,(err,data)=>{
                    if(!err && data){
                        callback(200,data)
                    } else {
                        callback(400,err)
                    }
                })
            } else {
                callback(403,'Invalid token')
            }
            } else {
                callback(422,'Missing a required field get users')
            }
            
        
    }

    handlers._users.PUT = (data,callback)=>{
        const checkData = HelpersHandlers.parse(data.payload);
        
        const firstName = HelpersHandlers.checkStringAndLength(checkData.firstName)
        const lastName = HelpersHandlers.checkStringAndLength(checkData.lastName)
        const password = HelpersHandlers.checkStringAndLength(checkData.password)
        const email = HelpersHandlers.checkIsEmail(checkData.email)
        

        if(email){
            if(firstName||lastName||password){

                _data.read('users',email,(err,userData)=>{
                 const token = typeof(data.headers.token) ==='string' ? data.headers.token : false;
                 if(token){
                    if(!err && userData){
                        if(firstName){
                            userData.firstName = firstName;
                        }
                        if(lastName){
                            userData.lastName = lastName;
                        }
                        if(password){
                            userData.hashedPassword= HelpersHandlers.hash(password)
                        }
                        _data.update('users',email,userData,(err)=>{
                           
                            if(!err){
                                callback(200)
                            } else {
                                callback(500,{"Error":err})
                            }
                        })
                    } else {
                        
                        callback(404,'No such user')
                    }
                 } else {
                     callback(403,'Invalid token in the headers')
                 }
                   

                })
            } else {
                callback(422,'Nothing for update')
            }
            
        
        } else {
            callback(422,'Missing a required field')
        }
    }

    handlers._users.DELETE = (data,callback)=>{
        const email = HelpersHandlers.checkIsEmail(data.query.email)
        if(email){
            const token = typeof(data.headers.token) ==='string' ? data.headers.token : false;
            if(token){
                _data.read('users',email,(err,data)=>{
                    if(!err && data){
                        _data.delete('users',email,(err)=>{
                            if(!err){
                                callback(200)
                            } else {
                                callback(500,err)
                            }
                        })
                    } else {
                        callback(400,err)
                    }
                })
            } else {
                callback(403,{"Error":"Cannot delete the user, invalid token in the headers"})
            }
            } else {
                callback(422,'Missing a required field')
            }
            
    }


    handlers._tokens.POST = (data,callback)=>{
        const checkData = HelpersHandlers.parse(data.payload);
        
        const password = HelpersHandlers.checkStringAndLength(checkData.password)
        const email = HelpersHandlers.checkIsEmail(checkData.email)

        if(email && password){
            _data.read('users',email,(err,userData)=>{
                if(!err && data){
                    const hashedPsssword = HelpersHandlers.hash(password);
                    if(hashedPsssword === userData.hashedPassword){
                        const tokenId = HelpersHandlers.createToken(20);
                        const expires = Date.now() + 1000 * 60 * 60;
                        const tokenObject = {
                            'id':tokenId,
                            'email':email,
                            'expires':expires
                        }
                        _data.create('tokens',tokenId,tokenObject,(err)=>{
                            if(!err){
                                callback(200,tokenObject)
                            } else {
                                callback(500,'Could not create a new token')
                            }
                        })
                    } else {
                        callback(400,{"Error":"Wrong password"})
                    }
                } else {
                    callback(400,'Cannot find this user')
                }
            })
        } else {
            callback(422,{"Error":"Missing require field(s)"})
        }
    }
    handlers._tokens.GET = (data,callback)=>{
        const tokenId = HelpersHandlers.checkIsToken(data.query.id)
        if(tokenId){
            _data.read('tokens',tokenId,(err,tokenData)=>{
                if(!err && data){
                    callback(200,tokenData)
                } else {
                    callback(400,"Specifies token does not exist")
                }
            })
        } else {
            callback(422,'Missing a required field tokens')
        }
        
    }
    handlers._tokens.DELETE = (data,callback)=>{
        const tokenId = HelpersHandlers.checkIsToken(data.query.id);
        if(tokenId){
            _data.read('tokens',tokenId,(err,tokenData)=>{
                if(!err && tokenData){
                    _data.delete('tokens',tokenId,(err)=>{
                        if(!err){
                            callback(200)
                        } else {
                            callback(500,{"Error":"Server error cannot delete"})
                        }
                    })
                } else {
                    callback(400,"Cannot find the token")
                }
            })
        } else {
            callback(422,{"Error":"Ivalid token"})
        }

    }
    handlers._tokens.PUT = (data,callback)=>{
        const checkData = HelpersHandlers.parse(data.payload);
        const tokenId = HelpersHandlers.checkIsToken(checkData.id);
        const extend = HelpersHandlers.isTrue(checkData.extend);

        _data.read('tokens',tokenId,(err,tokenData)=>{
            if(!err && tokenId){
                if(tokenData.expires > Date.now()){
                    tokenData.expires = Date.now() * 1000 * 60 * 60;
                    _data.update('tokens',tokenId,tokenData,(err)=>{
                        if(!err && data){
                            callback(200)
                        } else {
                            callback(500,'Could not update the token')
                        }
                    }
                )
                } else {
                    callback(401,{"error":"The token already expired"})
                }
            } else {
                callback(400, 'Specified token does not exist')
            }
        })

    }
    handlers._tokens.verifyToken = (tokenId, email,callback) =>{
        _data.read('tokens',tokenId,(err,tokenData)=>{
            if(!err&& tokenData){
                if(tokenData.id === tokenId && tokenData.expires>Date.now()){
                    callback(true)
                } else {
                    callback(false)
                }

            } else {
                callback(false)
            }
        })
    }


    handlers._checks.POST = (data,callback) => {
        const checkData = HelpersHandlers.parse(data.payload);
        console.log(checkData)
        const maxChecks = keys.maxChecks;
        const protocol = HelpersHandlers.isProtocol(checkData.protocol);
        const url = HelpersHandlers.isUrl(checkData.url);
        const method = HelpersHandlers.isMethod(checkData.method);
        const successCodes = HelpersHandlers.isSuccessCodes(checkData.successCodes);
        const timeOutSeconds = HelpersHandlers.isTimeoutSeconds(checkData.timeOutSeconds);
        const email = checkData.email;
        
        if(protocol || url || method || successCodes || timeOutSeconds){

            const token = HelpersHandlers.checkIsToken(checkData.id);

            if(token){
                _data.read('tokens',token,(err,tokenData)=>{
                    if(!err && tokenData){
                        _data.read('users',email,(err,userData)=>{
                            if(!err && userData){
                               
                                const userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                                    if(userChecks.length < maxChecks){
                                    const checkId = HelpersHandlers.createToken(20);

                                    const checkObject = {
                                        id:checkId,
                                        email:email,
                                        protocol:protocol,
                                        method:method,
                                        url:url,
                                        successCodes:successCodes,
                                        timeOutSeconds:timeOutSeconds
                                    }

                                    _data.create('checks',checkId,checkObject,(err)=>{
                                        if(!err){
                                            userData.checks = userChecks;
                                            userData.checks.push(checkId);

                                            _data.update('users',email,userData,(err)=>{
                                                if(!err){
                                                    callback(200,checkObject)
                                                } else {
                                                    callback(500,"Could not update the user with the new check")
                                                }
                                            })
                                        } else {
                                            callback(500,"Server wrong in checks")
                                        }
                                    })

                                } else {
                                    callback(400,"Maximum checks for this user")
                                }
                            } else {
                                callback(403,'Not found user')
                            }
                        })
                    } else {
                        callback(403,'No token')
                    }
                })
            } else {
                callback(422,'No token in the headers')
            }
        } else {
            callback(400,'Bad request')
        }
    }
    handlers._checks.GET = () => {
        
    }
    handlers._checks.DELETE = () => {
        
    }
    handlers._checks.PUT = () => {
        
    }
    handlers.notFound = (data,callback)=>{
        callback(404)
    }
    module.exports = handlers;