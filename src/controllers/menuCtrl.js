const menuModel = require('../models/menuMdl')
module.exports = {
    async index(req, res){
        const data = await menuModel.read()
        return res.json({data})
    },
    async post(req, res){
        const data = req.body

        console.log('Dados:',data)
        return res.json({data})
    },

    async available(req, res){
        let data = await menuModel.read()
        data = await menuModel.update(data,req.body)
        
        if(data)
            console.log('Cardápio atualizado!!')

        return res.json({data})
    }
}