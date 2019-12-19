let template = require('art-template');
let path = require('path');
function bindRender(req,res){
    req.render = function(filename,obj){
        let str = template(path.join(__dirname,'/views/'+filename+'.html'),{data:obj})
        res.end(str);
    }
}
module.exports = bindRender;