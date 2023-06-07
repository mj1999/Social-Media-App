const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mydb');

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('error connecting to db',err);
})
db.once('open',()=>{
    console.log('db connected')
})

module.exports = db;