const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const routes = require('./src/routes/routes')

app.use(cors())

const forceSsl = function (req, res, next) {   //Redirecionamento automático de HTTP para HTTPS
    if (req.headers['x-forwarded-proto'] !== 'https'  && req.hostname !== 'localhost') {
        console.log('REDIRECT HTTP > HTTPS')
        return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }
    return next()
}
app.use(forceSsl)

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(routes)

app.listen(process.env.PORT || 8000,()=>console.log('App is running...'))
