const {Router} = require('express')
const routes = Router()

const menu = require('../controllers/menuCtrl')

const sabor = require('../controllers/saborCtrl')
const item = require('../controllers/itemCtrl')
const cliente = require('../controllers/clienteCtrl')
const clientePedido = require('../controllers/clientePedidoCtrl')
const itemSabor = require('../controllers/itemSaborCtrl')

routes.get('/menu', menu.index)

routes.get('/item',item.index)
routes.post('/item',item.create)
routes.put('/item/:id',item.update)
routes.delete('/item/:id', item.delete)

routes.get('/sabor',sabor.index)
routes.post('/sabor', sabor.create)
routes.put('/sabor/:id', sabor.update)
routes.delete('/sabor/:id', sabor.delete)

// // /item/4/sabor
routes.get('/item/:id/sabor',itemSabor.index)
routes.post('/item/:id/sabor',itemSabor.create)
routes.delete('/item/:id/sabor/:saborId',itemSabor.delete)
routes.put('/item/sabor/:id',itemSabor.update)


routes.get('/cliente',cliente.index)
routes.post('/cliente', cliente.create)
routes.put('/cliente/:id', cliente.update)
routes.delete('/cliente', cliente.delete)

routes.get('/cliente/:id/pedido',clientePedido.index)
routes.post('/cliente/pedido', clientePedido.create)
routes.put('/cliente/:id/pedido', clientePedido.update)
routes.delete('/cliente/:id/pedido', clientePedido.delete)


module.exports = routes