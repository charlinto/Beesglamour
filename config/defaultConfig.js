module.exports ={
    // mongoURI: "mongodb://localhost/blog",
    mongoURI: " mongodb+srv://beesglamour:1234567890@cluster0.phvgo.mongodb.net/test",
    globalVariable: (req, res, next) =>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        next();
    }
}