// const jwt = require('jsonwebtoken')

// exports.isLoggedin = (req, res, next) => {
//     var token = req.cookies.token
//     console.log(token)
//     if (token) {
//         var decoded = jwt.verify(token, 'SECRET')
//         console.log(decoded)
//         if (decoded) {
//             next()
//         } else {
//             return res.json({message:'invalid token'})
//         }
//     } else {
//         next()
//     }
// }

const jwt = require('jsonwebtoken');
exports.protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Invalid token' });
    }
};



