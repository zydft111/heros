const heroData = require('./heroData');
const querystring = require('querystring');

module.exports = {
    // 显示首页
    showIndex(req, res) {
        heroData.getAllHero((err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据读取错误'
            }));
            // console.log(JSON.parse(data))
            req.render('index', JSON.parse(data));
        })
    },
    // 显示信息页
    showInfo(req, res) {
        heroData.getOneHero(req.id, (err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据读取错误'
            }));
            // console.log(data);
            req.render('info', data)
        })
    },
    // 显示编辑页
    showEdit(req, res) {
        heroData.getOneHero(req.id, (err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 201,
                msg: '数据读取错误'
            }));
            // console.log(data);
            req.render('edit', data)
        })
    },
    // 显示添加页
    showAdd(req,res){
            req.render('add', {})
    },
    // 添加英雄
    addHero(req,res){
        let str = '';
        req.on('data', chunk => {
            str += chunk
        });
        req.on('end', () => {
           let obj = querystring.parse(str)
            // console.log(obj)
            heroData.addHero(obj, result => {
                if (result) {
                    res.end(JSON.stringify({
                        code: 200,
                        msg: '编辑数据成功'
                    }))
                } else {
                    res.end(JSON.stringify({
                        code: 201,
                        msg: '编辑读取错误'
                    }))
                }              
            })
        })
      
    },
    // 编辑英雄
    editHero(req, res) {
        let str = '';
        req.on('data', chunk => {
            str += chunk
        });
        req.on('end', () => {
           let obj = querystring.parse(str)
            // console.log(obj)
            heroData.editHero(obj, result => {
                if (result) {
                    res.end(JSON.stringify({
                        code: 200,
                        msg: '编辑数据成功'
                    }))
                } else {
                    res.end(JSON.stringify({
                        code: 201,
                        msg: '编辑读取错误'
                    }))
                }              
            })
        })
      
    },
    // 删除英雄
    removeHero(req, res) {
        heroData.removeHero(req.id, result => {
            if (result) {
                return res.end(JSON.stringify({
                    code: 200,
                    msg: '删除读取成功'
                }))
            } else {
                return res.end(JSON.stringify({
                    code: 201,
                    msg: '删除读取失败'
                }))
            }
        })
    },
    // 加载静态文件
    loadStatic(req, res) {
        heroData.getStatic(req.pathname, (err, data) => {

            if (err) return {
                code: 201,
                msg: '数据读取错误'
            };
            if (req.pathname.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css;charset=utf8')
            }
            res.end(data)
        })
    }
}