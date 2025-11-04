const express = require('express')
const path =require("path")
const BodyParser = require('body-parser')
const cors = require ('cors')
const Db = require('./Db')
import 'dotenv/config'
const Route = require('./Route')


const app = express()
const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(BodyParser.json())
app.use('/upload',express.static(path.join(__dirname,'Image')))
app.use('/',Route)
app.listen(PORT,()=>{
console.log(`Server connect on ${PORT}`);
    
})