const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'YUH4.,UTJds9.3I23_fdg8.547}[W{_46.Qhg.jHEI';

module.exports = function(roles) {
    var module = {};

    module.verify = function(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided' });
        }
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate client' });
            } else {
                if (roles.indexOf(decoded.role) != -1) {
                    next();
                } else {
                    return res.status(500).send({ auth: false, message: 'You do not have permission to access the API' });
                }
            }
        });
    };

    return module;
};
