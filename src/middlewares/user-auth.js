
const UserAuthentication = (req,res,next) =>{

    if( !req.body.email || !req.body.password ){
        return res.status(400).json({
            message: `Invalid email and password`,
            success : false,
            err: error
        });
    }
    next();


}

module.exports = {
    UserAuthentication,
}