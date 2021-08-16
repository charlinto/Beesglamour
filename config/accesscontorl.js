const AccessControl = require('accesscontrol');

module.exports = {
accassControl: (req,res, next) => {
const ac = new AccessControl();
ac.grant('user')                    // define new or modify existing role. also takes an array.
    .createOwn('video')             // equivalent to .createOwn('video', ['*'])
    .deleteOwn('video')
    .readAny('video')
  .grant('admin')   
    .readAny('adminDashboard')                // switch to another role without breaking the chain
    .extend('user')                 // inherit role capabilities. also takes an array
    .updateAny('video', ['title'])  // explicitly defined attributes
    .deleteAny('video'); 


    const permission = ac.can(req.user.role).readAny('adminDashboard');
    if (permission.granted){
        return next();

    }else{
        req.flash("error_msg","error bro")
        res.redirect("/account/login");
    }
  }

}
