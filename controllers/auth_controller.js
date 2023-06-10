module.exports.auth = {
    signIn: function(req,res){
    res.render('login');
},
   signUp : function(req,res){
    res.render('register');
}
}