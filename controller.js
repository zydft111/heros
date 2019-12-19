let heroData = require('./heroData');

module.exports = {
    // 显示首页
    showIndex(req,res){
        heroData.getAllHero((err,data)=>{
            if(err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据读取错误'
            }));
            // console.log(JSON.parse(data))
            req.render('index',JSON.parse(data));
        })
    },
    // 显示信息页
    showInfo(req,res){
        heroData.getOneHero(req.id,(err,data)=>{
            if(err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据读取错误'
            }));
            // console.log(data);
            req.render('info',data)
        })
    },

    // 加载静态文件
    loadStatic(req,res){
        heroData.getStatic(req,res,(err,data)=>{
            // console.log(req.pathname)
            if(err) return {
                code: 201,
                msg: '数据读取错误'
            };
            if(req.pathname.endsWith('.css')){
                res.setHeader('Content-Type','text/css;charset=utf8')
            }
            res.end(data)
        })
    }
}