const fs = require('fs');
const path = require('path');
const moment = require('moment');

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
    // 添加英雄
    addHero(obj,callback){
        obj.date = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(obj)
        this.getAllHero((err,data)=>{
            if(err) return callback(false);
            let arr = JSON.parse(data);
            obj.id = +arr[arr.length-1].id+1
            // console.log(obj.id)
            arr.push(obj)
            fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(arr),'utf8',(err)=>{
                if(err) return callback(false);
                  callback(true)  
              })
        })
    },
    // 编辑数据
    editHero(obj,callback){
        obj.date = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(obj)
        this.getAllHero((err,data)=>{
            if(err) return callback(false);
            let arr = JSON.parse(data);
            arr.some((e,i)=>{
                if(e.id == obj.id){
                    arr.splice(e,1,obj)
                };
                return;
            })
            fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(arr),'utf8',(err)=>{
                if(err) return callback(false);
                  callback(true)  
              })
        })
    },
    // 删除数据
    removeHero(id,callback){
        this.getAllHero((err,data)=>{
            
            if(err) return callback(false);
            let arr = JSON.parse(data).filter(e=>{
                return e.id != id;
            })
            let str = JSON.stringify(arr)
            fs.writeFile(path.join(__dirname,'./heros.json'),str,'utf8',(err)=>{
              if(err) return console.log(false);
                callback(true)  
            })
        })
    },
    // 加载静态文件
    getStatic(url,callback){
    
        fs.readFile(path.join(__dirname,url),'utf8',(err,data)=>{
            if(err) return callback(err);
            callback(null,data)
        })
    }

}
