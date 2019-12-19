let fs = require('fs');
let path = require('path');

module.exports = {
    // 获取全部数据
   getAllHero(callback){
        fs.readFile(path.join(__dirname,'./heros.json'),'utf8',(err,data)=>{
            if(err) return callback(err);
            callback(null,data)
        })
    },
    // 根据id获取数据
    getOneHero(id,callback){
        this.getAllHero((err,data)=>{
            if(err) return callback(err);
            let obj;
            JSON.parse(data).some(e=>{
                if(id == e.id){
                    obj = e;
                }
            })
            callback(null,obj)
        })
    },
    // 删除数据
    removeHero(id,callback){
        this.getAllHero((err,data)=>{
            
            if(err) return callback(err);
            let arr = JSON.parse(data).filter(e=>{
                return e.id != id;
            })
            fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(arr),err=>{
              if(err) return callback(err);
                this.getAllHero(callback);  
            })
        })
    },
    // 加载静态文件
    getStatic(req,res,callback){
        fs.readFile(path.join(__dirname,req.pathname),(err,data)=>{
            if(err) return callback(err);
            callback(null,data)
        })
    }

}
