import axios from 'axios'
require('dotenv/config')

let baseURL

if(window.location.hostname === 'localhost')
    baseURL = process.env.REACT_APP_BASE_URL_DEV
else
    baseURL = process.env.REACT_APP_BASE_URL

const Api = axios.create({ baseURL })

export default { Api, baseURL }
