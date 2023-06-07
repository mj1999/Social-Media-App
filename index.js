const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const layout = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(layout);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));  

//set views and view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server started on port : ${port}`);
})