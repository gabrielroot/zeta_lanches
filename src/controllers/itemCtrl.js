const  { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req,res){
         
        const itens = await prisma.item.findMany({
            // where:{
            // item_sabor:{
            //     every:{ disponivel: false }    
            //     }
            // },
            select:{
                id: true,
                nome: true,
                descricao: true,
                imagem: true,
                preco: true,
                disponivel:true,
                item_sabor:{
                    select:{
                        sabor:{
                            select:{
                                id:true,
                                nome: true
                            }
                        }
                    }
                }
            },orderBy:{nome: "asc"}
        })
        if(itens)
            return res.status(200).json({message: "sucesso!",status:true,itens})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async create(req, res){
        const item = req.body
        const created = await prisma.item.create({data:item})
        if(created)
            return res.status(201).json({message: "Criado!",status:true,created})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async update(req,res){

        const {id} = req.params
        const item = req.body

        const founded = await prisma.item.findOne({where:{
            id: parseInt(id)
        }})
        if(founded){
            const updated = await prisma.item.update({
                where: { id: parseInt(id) },
                data: item
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
        const {id} = req.params

        const founded = await prisma.item.findOne({where:{id: parseInt(id)}})
        if(founded){
            const destroyed = await prisma.item.delete({
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
    async addSabor(req,res){
        const {item_fk, sabor_fk} = req.body


        //verifica se existe, então...
        const created = await prisma.item_sabor.create({data:{
            disponivel: true,
            item_fk,
            sabor_fk
        }})

        return res.json(created)
    }
}