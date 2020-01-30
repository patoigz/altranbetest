const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Client = require('../model/client');
const SECRET = process.env.SECRET || 'YUH4.,UTJds9.3I23_fdg8.547}[W{_46.Qhg.jHEI';

router.post('/login', function(req, res) {
    let _id = req.body.id;
    Client.findOne({ id: _id }, { _id: 0 })
        .then(doc => {
            let token = jwt.sign(doc._doc, SECRET, {
                expiresIn: 60 * 60 * 4 // expira en 4 horas
            });
            return res.status(200).send({ token: token });
        })
        .catch(err => {
            return res.status(500).send(err);
        });
});

module.exports = router;
