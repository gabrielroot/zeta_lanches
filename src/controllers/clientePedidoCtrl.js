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
        const {idSabor, item_fk, cliente_fk, ...pedido} = req.body

        const cliente = await prisma.cliente.findOne({where:{id:cliente_fk}}) //verificar se ambos existem
        const item = await prisma.item.findOne({where:{id:item_fk}})

        if(!cliente || !item)
            return res.status(404).json({message: "Erro, cliente ou item não encontrado",status:false})

        const clientePedido = await prisma.cliente_pedido.create({data:{ //depois, confirmar se foi criado
            ...pedido,
            item: {connect:{id: item_fk}},
            cliente: {connect:{id: cliente_fk}}
        },
        select:{
            id: true
        }
        })

        const itemSabor = await prisma.item_sabor.findOne({where:{id: idSabor}})

        const pedidoSabor = await prisma.pedido_sabor.create({data:{
            quantidade: 2,
            item_sabor: {connect:{ id: itemSabor.id }},
            cliente_pedido: {connect:{ id: clientePedido.id }}
        }})


        if(pedidoSabor){
            return res.status(201).json({message: "Criado!",status:true,pedidoSabor})
        }
        else
            return res.status(500).json({message: "Erro, falha interna",status:false,pedidoSabor})
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