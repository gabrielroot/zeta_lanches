const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req,res){
        const sabores = await prisma.sabor.findMany()
        if(sabores)
            return res.status(200).json({message: "sucesso!",status:true,sabores})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async create(req,res){
        const {nome} = req.body
        
        const sabor = await prisma.sabor.create({data:{nome}})
        if(sabor)
            return res.status(201).json({message: "Criado!",status:true,sabor})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async delete(req,res){

        const {id} = req.params

        const found = await prisma.sabor.findOne({where:{
            id: parseInt(id)
        }})
        if(found){
            const destroyed = await prisma.sabor.delete({
                where:{
                    id: parseInt(id)
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
        const {nome} = req.body

        const found = await prisma.sabor.findOne({where:{
            id: parseInt(id)
        }})
        if(found){
            const updated = await prisma.sabor.update({
                where:{ id: parseInt(id)},
                data: {nome}
            })
            if(updated)
                return res.status(200).json({message: "Atualização concluída!",status:true})
            else
                return res.status(500).json({message: "ID encontrado, porém, não atualizado",status:false})
        }else return res.status(404).json({message: "ID não encontrado",status:false})
    }
}
