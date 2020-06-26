const {Router} = require('express')
const routes = Router()
const pagesController = require('../controllers/pagesController')

routes.get('/', pagesController.index)
routes.get('/menu', pagesController.menu)
routes.get('/hoje', pagesController.hoje)


routes.post('/confirm', pagesController.post)
routes.post('/available', pagesController.available)

//Redireciona, caso receba req em form expirado
routes.get('/confirm', function(req, res){
    res.redirect('/menu')
})

module.exports = routes