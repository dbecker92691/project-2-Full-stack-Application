module.exports = function(req, res, next){
    if(!req.session.userId){
        req.session.message = "you must be logged in"
        res.redirect('/auth/login')
    }else{
        next()
    }
}