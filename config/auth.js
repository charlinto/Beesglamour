module.exports ={
    ensureAuthenticated: function(req,res,next){
        if (req.isAuthenticated()){
            return next();
        }
    req.flash('error_msg','please login to views this page')
    res.redirect('/account/login')
    }
}