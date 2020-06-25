const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const routes = require('./src/routes/routes')

nunjucks.configure('./src/views',{
    express: app,
    noCache: !false
})
app.set('view engine', 'njk')
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))
app.use(routes)

app.listen(8000,()=>console.log('App is running...'))


// MOBILE == https://api.whatsapp.com/send?phone=5538998988064&text=kkkkkkkk
// PC == https://web.whatsapp.com/send?phone=5538998988064&text=kkkkkkkk