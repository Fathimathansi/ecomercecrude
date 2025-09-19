const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/projectdatabase')
var db = mongoose.connection

db.on('error', console.error.bind('error'))

db.once('open',()=>{
    console.log('Db connection');
    
})
module.exports=db
