// Check whether the user is logged in

exports.isLogged = (req,res,next)=>{
  if(req.session.isLoggedIn)
}