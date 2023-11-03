const jwt = require("jsonwebtoken");

exports.auth = async (req,res,next) => {
try {
    const token = req.headers.authorization.split(" ")[0];
    let decodeData;
    if(token){
        decodeData = jwt.verify(token,'key');
    }
    next();
} catch (error) {
    res.status(200).json({status:201, message:"Unauthorized Access" , "error":error.message});   
}

}

module.exports = auth ;