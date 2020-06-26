const fs = require('fs')

module.exports = {
    read(){
        return new Promise(function (resolve,reject){
            fs.readFile('src/data/menu.json','utf8', (err,obj)=>{
                if(err)
                    reject(err)
                else{
                    obj = JSON.parse(obj)
                    resolve(obj)
                }
            })
        })
    },
    async update(data,body){
        return new Promise(function(resolve,reject){
            for(let i = 0; i<data.length; i++){
                data[i].status = body[i]=='1'?true:false
                console.log('data.status: '+data[i].status+' | body: '+body[i])
            }
            data = JSON.stringify(data)
            fs.writeFile('src/data/menu.json',data,'utf8',(err)=>{
                if(err)
                    reject(err)
                else{
                    data = JSON.parse(data)
                    resolve(data)
                }
            })
        })
    }
}