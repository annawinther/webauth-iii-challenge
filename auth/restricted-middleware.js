const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = (req, res, next) => {
    const authHeaderIsPresent = req.headers.authorization;
    // const authHeaderIsPresent = req.headers.authorizations;

    if(authHeaderIsPresent){
        jwt.verify(authHeaderIsPresent, secret.jwtSecrets, (err, decodedToken) => {
            if(err){
                res.status(401).json({ you:'cannot enter' });
            } else {
                req.decodedToken = decodedToken;
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.status(403).json({ you: 'shall not pass!'})
    }
}