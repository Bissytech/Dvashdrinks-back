const jwt = require('jsonwebtoken')


const Verifytoken = (req,res, next) =>{
const secretKey = process.env.Jwt_SECRET
const authHeader = req.headers.authorization || req.headers.Authorization

if (!authHeader) {
    res.status(400).send({Message: 'Authorization not provided'})
} else if(!authHeader.startsWith('Bearer')) {
    res.status(400).send({message: ' Invalid Authorization Format'})
}else{
    const token = authHeader.split(' ')[1]
    jwt.verify(token, secretKey, (err, decode) =>{
        if (err) {
            res.status(400).send({message:' Error verifying Token'})
            
        }else{
            console.log("received Details:", decode.user);
            req.user = decode.user
            next()
            
        }
    })
}




}
module.exports = Verifytoken