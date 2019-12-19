const http = require('http');
const bindRender = require('./bindRender');
const router = require('./router')

const app = http.createServer();

app.listen(3000);

app.on('request',(req,res)=>{
    bindRender(req,res);
    router(req,res);

})
