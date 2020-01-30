const Client = require('../model/client');

const service = {
    all: (req, res) => {
        Client.find({}, { _id: 0, id: 0, role: 0 })
            .then(docs => {
                return res.json({ clients: docs });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    }
};

module.exports = service;
