// This is one way that we could configure our secrets

// module.exports = {
//     jwtSecrets: process.env.JWT_SECRET || 'THIS IS A REALLY LONG SECRET'
// }
module.exports = {
    jwtSecrets: process.env.JWT_SECRET || 'THIS IS A LONG SECRET'
}