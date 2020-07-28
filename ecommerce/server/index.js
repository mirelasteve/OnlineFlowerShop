
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf-8');
const _data = require('./lib/data');
const handlers = require('./lib/handlers/handlers')


const server = http.createServer((req,res)=>{
    
    const parseUrl = url.parse(req.url,true);
    const trimmedPath = parseUrl.pathname.replace(/^\/+|\/+$/g,'');
    const query = parseUrl.query;
    const headers =req.headers;
    const method = req.method;
 
    let buffer = '';
    req.on('data',(data)=>{
        buffer+=decoder.write(data)
       
    });
    req.on('end',function(){
        buffer+=decoder.end()
        
        const data = {
            'method':method,
            'query':query,
            'headers':headers,
            'payload':buffer
        }
       
        
       const choosenHandler = router[trimmedPath]; 
       choosenHandler(data,(statusCode,payload)=>{
           const payloadString = JSON.stringify(payload);
           res.setHeader('Content-Type','application/json')
           res.writeHead(statusCode);
           res.end(payloadString)
       })
    })
    

    const router = {
        sample:handlers.sample,
        users:handlers.users,
        tokens:handlers.tokens,
        checks:handlers.checks
    }
});
server.listen(5000,()=>console.log('Listen on 5000'))