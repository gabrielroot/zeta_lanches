const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async index(req,res){
        const {id} = req.params
        const pedidos = await prisma.cliente_pedido.findMany({
            where:{
                cliente_fk: { equals: parseInt(id) }
            },
            select:{
                subtotal: true,
                quantidade: true,
                item:{
                    select:{
                        id: true,
                        nome: true,
                        preco: true
                    }
                },
                pedido_sabor: { select:{ 
                    quantidade: true,
                    item_sabor:{
                    select:{
                        sabor:{
                            select:{
                                nome: true
                            }
                        }
                    }
                }
                } }
            }
        })
        if(pedidos)
            return res.status(200).json({message: "sucesso!",status:true,pedidos})
        else
            return res.status(500).json({message: "Erro, falha interna",status:false})
    },

    async create(req, res){
        const {idSabor, item_fk, nome, observacao, troco, quantidade, subtotal, local} = req.body

        let itemSabor,pedido = {}
        if(idSabor)
            itemSabor = await prisma.item_sabor.findOne({where:{id: idSabor}})
        const item = await prisma.item.findOne({where:{id:item_fk}})

        if(!itemSabor && idSabor || !item)
            return res.status(404).json({message: "Erro, item ou sabor não encontrado",status:false})

        if(itemSabor)    //Se existe a chave "itemSabor", faça um insert no "pedido_sabor"
            pedido = await prisma.cliente_pedido.create({data:{
                subtotal,
                quantidade,
                item:{
                    connect:{id:item_fk}
                },
                cliente:{
                    create:{
                        nome,
                        troco,
                        observacao,
                        // local,
                    }
                },
                pedido_sabor:{//criar um "for" separado, inserindo cada sabor
                    create:{
                        quantidade, //a quantidade de sabor: 1 refri laranja
                        item_sabor:{connect:{id:idSabor}}
                    }
                }},select:{ id:true }
            })
        else
            pedido = await prisma.cliente_pedido.create({data:{
                subtotal,
                quantidade,
                item:{
                    connect:{id:item_fk}
                },
                cliente:{
                    create:{
                        nome,
                        troco,
                        observacao,
                        // local,
                    }
                }},select:{ id:true }
            })

        if(pedido){
            return res.status(201).json({message: "Criado!",status:true,pedido})
        }
        else
            return res.status(500).json({message: "Erro, falha interna",status:false,pedido})
    },

    async update(req,res){
        const {id} = req.params
        const item = req.body

        const founded = await Pedidos.findByPk(id)
        if(founded){
            const updated = await Pedidos.update(item,{
                where:{
                    id
                }
            })
            if(updated)
                return res.status(200).json({message: "Atualização concluída!",status:true})
            else
                return res.status(500).json({message: "ID encontrado, porém, não atualizado",status:false})

        }else return res.status(404).json({message: "ID não encontrado",status:false})

    },

    async delete(req,res){
        const {id} = req.body

        const founded = Pedidos.findByPk(id)
        if(founded){
            const destroyed = await Pedidos.destroy({
                where:{
                    id
                }
            })
            if(destroyed)
                return res.status(200).json({message: "Deletado!",status:true})
            else
                return res.status(500).json({message: "ID encontrado, porém, não deletado",status:false})

        }else return res.status(404).json({message: "ID não encontrado",status:false})
    }
}