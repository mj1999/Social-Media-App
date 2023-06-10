const User = require('../models/user_schema');


module.exports.profile = function(req,res){
    res.render('user_profile');
}
module.exports.friendList = function(req,res){
    res.end('<h1>My friends </h1>')
}
module.exports.create = function(req,res)
{
    User.create(req.body).then((user)=>{console.log('user created--',user)}).catch((err)=>{console.error.bind(console,'Error creating user')});
    res.redirect('/');
}
module.exports.login = function(req,res)
{
    const credentials = req.body;
    User.find(credentials).then((credential)=>{
        console.log(credential)
        if(credential[0]){
            res.render('user_profile',{user_name:credential[0].name});
        }
        else{
            res.send('<h1>User not in database</h1>')
        }
        
    }).catch((err)=>{console.error.bind(console,'Error getting user from db')});
}
