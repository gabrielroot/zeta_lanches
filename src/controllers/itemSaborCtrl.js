const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req,res){
        const {id} = req.params
        const sabores = await prisma.item_sabor.findMany({
            where:{
                item_fk:{
                    equals: parseInt(id)
                }
            },
            select:{
                id: true,
                disponivel: true,
                sabor:{ select:{ nome: true } }
            }
        })
        if(sabores)
            return res.status(200).json({message: "sucesso!",status:true,sabores})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async create(req,res){
        const {id} = req.params
        const {sabores_id} = req.body
        
        const hasItem = await prisma.item.findOne({where:{id: parseInt(id)}})
        let sabor = {}

        if(hasItem)
            sabores_id.map(async (saborId)=>{
                sabor = await prisma.item_sabor.create({data:{
                    item: {connect:{id:parseInt(id)}},
                    sabor: {connect:{id: saborId}}
                }})
            })
        else{
            return res.status(404).json({message: "Erro, Sabor ou item de referência não existem",status:false})
        }

        if(sabor)
            return res.status(201).json({message: "Criado!",status:true,sabor})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async delete(req,res){

        const {id} = req.body

        const found = await prisma.item_sabor.findOne({where:{
            id
        }})
        if(found){
            const destroyed = await prisma.item_sabor.delete({
                where:{
                     id
                }
            })
            if(destroyed)
                return res.status(200).json({message: "Deletado!",status:true})
            else
                return res.status(500).json({message: "ID encontrado, porém, não deletado",status:false})

        }else{
            return res.status(404).json({message: "ID não encontrado",status:false})
        }
    },
    
    async update(req,res){
        const {id} = req.params
        const {disponivel} = req.body

        const found = await prisma.item_sabor.findOne({where:{
            id: parseInt(id)
        }})
        if(found){
            const updated = await prisma.item_sabor.update({
                where:{ id: parseInt(id)},
                data: {disponivel}
            })
            if(updated)
                return res.status(200).json({message: "Atualização concluída!",status:true})
            else
                return res.status(500).json({message: "ID encontrado, porém, não atualizado",status:false})
        }else return res.status(404).json({message: "ID não encontrado",status:false})
    }
}
