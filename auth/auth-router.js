const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secret = require('../config/secrets');

router.post('/register', async (req, res) => {
      
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        const users = await Users.add(user)
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({ message: 'could not register new user'})
    }

    // Users.add(user)
    //     .then(saved => {
    //         res.status(201).json(saved)
    //     })
    //     .catch(error => {
    //         res.status(500).json({ message: 'could not register new user'})
    //     })
})

router.post('/login', (req, res) => {
    let { username, password} = req.body;

    Users.findBy({ username })
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ 
                message: `You're now logged in as ${user.username}`,
                token: token
            })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'could not log in this user' });
    })
})

function generateToken(user){
    const payload = {
        sub: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret.jwtSecrets, options)
}

module.exports = router;