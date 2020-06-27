const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const routes = require('./src/routes/routes')

const forceSsl = function (req, res, next) {   //Redirecionamento automático de HTTP para HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https'  && req.hostname !== 'localhost') {
        console.log('REDIRECT HTTP > HTTPS')
        return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }
    return next()
}
app.use(forceSsl)

nunjucks.configure('./src/views',{
    express: app,
    noCache: !false
})
app.set('view engine', 'njk')
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))
app.use(routes)

app.listen(process.env.PORT || 8000,()=>console.log('App is running...'))


// MOBILE == https://api.whatsapp.com/send?phone=5538998988064&text=kkkkkkkk
// PC == https://web.whatsapp.com/send?phone=5538998988064&text=kkkkkkkk