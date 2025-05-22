const jwt = require('jsonwebtoken')


const usertoken = (user) => {
    return jwt.sign({
        name: user.name,
        id: user._id,
    }, process.env.JWT_SECRET)

}

module.exports = usertoken


