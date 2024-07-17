const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.status(401).send({ responeMessage: 'Authorisation failed!', responseError: 'No token' })
    }
    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if(err){
            return res.status(403).send({ responeMessage: "Authentication failed!", responseError: 'Invalid token' })
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken