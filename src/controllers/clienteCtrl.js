const  { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req,res){
         
        const clientes = await prisma.cliente.findMany()
        if(clientes)
            return res.status(200).json({message: "sucesso!",status:true,clientes})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async create(req, res){
        const cliente = req.body
        const created = await prisma.cliente.create({data:{
            ...cliente,
            cliente_pedido:{
                create:{
                subtotal: 1,
                quantidade: 1,
            }
            }
        }
        })
        if(created)
            return res.status(201).json({message: "Criado!",status:true,created})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async update(req,res){

        const {id} = req.params
        const cliente = req.body

        const founded = await prisma.cliente.findOne({where:{
            id: parseInt(id)
        }})
        if(founded){
            const updated = await prisma.cliente.update({
                where: { id: parseInt(id) },
                data: cliente
            })
            if(updated)
                return res.status(200).json({message: "Atualização concluída!",status:true})
            else
                return res.status(500).json({message: "ID encontrado, porém, não atualizado",status:false})

        }else{
            return res.status(404).json({message: "ID não encontrado",status:false})
        } 

    },

    async delete(req,res){
        const {id} = req.body

        const founded = await prisma.cliente.findOne({where:{id}})
        if(founded){
            const destroyed = await prisma.cliente.delete({
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
    }
}