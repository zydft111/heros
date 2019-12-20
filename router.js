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
        control.showAdd(req,res)
    }else if(method == 'GET' && (pathname =='/edit' || pathname =='/edit.html')){
        control.showEdit(req,res)
    }else if(method == 'GET' && (pathname =='/info' || pathname =='/info.html')){
        control.showInfo(req,res)
    }else if(method == 'GET' && pathname =='/deleteHero'){
        control.removeHero(req,res)
    }else if(method == 'POST' && pathname =='/editHero'){
        control.editHero(req,res)
    }else if(method == 'POST' && pathname =='/addHero'){
        control.addHero(req,res)
    }else if(method == 'GET' && (pathname.startsWith('/node_modules'))){
        control.loadStatic(req,res)
    }else {
        res.end('404')
    }
}

module.exports = router;