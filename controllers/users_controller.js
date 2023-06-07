module.exports.profile = function(req,res){
    res.render('user_profile');
}
module.exports.friendList = function(req,res){
    res.end('<h1>My friends </h1>')
}