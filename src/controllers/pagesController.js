const fs = require('fs')

module.exports = {
    async index(req, res){
        return res.render('index')
    },
    async menu(req, res){
        let data = {}
        fs.readFile('src/data/menu.json','utf8',(err,obj)=>{
            if(err){
                console.error(err)
                res.send('Erro ao carregar cardápio')
            }
            data = JSON.parse(obj)
            return res.render('menu',{data})
        })
    },
    async post(req, res){
        let data = []

        for(let i = 0; i<req.body.nome.length; i++){
            if(Number(req.body.quantidade[i])>0){
                const nome = req.body.nome[i]
                const quantidade = req.body.quantidade[i]
                data.push({nome,quantidade})
            }
        }
    
        const total = req.body.total

        return res.render('confirm',{data,total})
    }
}