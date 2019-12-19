const path = require('path');
const urlModle = require('url');
const control = require('./controller')

function router(req,res){
    let url = req.url;
    let method = req.method;
    let query = urlModle.parse(url,true).query;
    let pathname = urlModle.parse(url,true).pathname;
    req.id = query.id;
    req.pathname = pathname;
    if(method == 'GET' && (pathname == '/' || pathname == '/index' || pathname == '/index.html')){
        control.showIndex(req,res)
    }else if(method == 'GET' && (pathname =='/add' || pathname =='/add.html')){

    }else if(method == 'GET' && (pathname =='/exit' || pathname =='/exit.html')){

    }else if(method == 'GET' && (pathname =='/info' || pathname =='/info.html')){
        control.showInfo(req,res)
    }else if(method == 'GET' && (pathname.startsWith('/node_modules'))){
        control.loadStatic(req,res)
    }else {
        res.end('404')
    }
}

module.exports = router;