import axios from 'axios'
require('dotenv/config')
const baseURL = process.env.REACT_APP_BASE_URL


const Api = axios.create({ baseURL })

export default { Api, baseURL }
