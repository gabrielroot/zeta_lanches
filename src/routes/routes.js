const {Router} = require('express')
const routes = Router()
const pagesController = require('../controllers/pagesController')

routes.get('/', pagesController.index)
routes.get('/menu', pagesController.menu)


routes.post('/confirm', pagesController.post)

//Redireciona, caso receba req em form expirado
routes.get('/confirm', function(req, res){
    res.redirect('/menu')
})

module.exports = routes