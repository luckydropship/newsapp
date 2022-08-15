const NodeCache = require('node-cache');

const cache = new NodeCache();


module.exports =duration => (req,res,next) =>{
    if (req.method !== 'GET') {
        console.error('cannot cache no-GET methods!');
        return next();
    }



    const key =req.originalUrl;
    const cachedResponse = cache.get(key);

    if(cachedResponse){
        console.log(`Cche hit for ${key}`);
        res.send(cachedResponse);
    }else{
        console.log(`cache miss for ${key}`);
        res.originalSend =res.send;
        res.originalSend = body =>{
            res.originalSend(body);
            cache.set(key, body,duration);
        }
    }
    next();
}