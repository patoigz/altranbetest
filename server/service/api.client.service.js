const Client = require('../model/client');

const service = {
    /*
     * retorna todos los clientes
     */
    all: (req, res) => {
        Client.find({}, { _id: 0, id: 0, role: 0 })
            .then(docs => {
                return res.json({ clients: docs });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    },
    /*
     * retorna la información de un cliente en particular
     */
    findByClientId: (req, res) => {
        let _id = req.params._id;
        Client.findOne({ id: _id }, { _id: 0, id: 0, role: 0 })
            .then(doc => {
                return res.json(doc);
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    },
    /*
     * retorna la información de un cliente en particular
     */
    findByClientName: (req, res) => {
        let _name = req.params._name;
        Client.findOne({ name: { $regex: _name, $options: '-i' } }, { _id: 0, id: 0, role: 0 })
            .then(doc => {
                return res.json(doc);
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    }
};

module.exports = service;
